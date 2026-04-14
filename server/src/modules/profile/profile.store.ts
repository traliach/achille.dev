import { isDatabaseReady } from '../../config/database.js'
import type { ProfileContent } from '../../types/content.js'
import { logInfo, logWarn } from '../../utils/logger.js'
import { profile as seedProfile } from './profile.data.js'
import { ProfileModel } from './profile.model.js'

type ProfileRecord = ProfileContent & {
  key: 'main'
  _id?: unknown
}

function stripProfileMetadata(document: ProfileRecord) {
  const { _id, key, ...profile } = document
  return profile
}

async function readMongoProfile() {
  const document = (await ProfileModel.findOne().lean().exec()) as
    | ProfileRecord
    | null

  if (!document) {
    await ProfileModel.create({ key: 'main', ...seedProfile })
    logInfo('Seeded profile collection from static data.')
    return seedProfile
  }

  let anyUpdate = false

  // Sync scalar text fields.
  const textFields = ['summary', 'intro', 'about', 'availability', 'title', 'location'] as const
  const stale = textFields.filter((field) => document[field] !== seedProfile[field])
  if (stale.length > 0) {
    await ProfileModel.updateOne(
      { key: 'main' },
      { $set: Object.fromEntries(stale.map((f) => [f, seedProfile[f]])) },
    )
    logInfo(`Synced profile field(s) from static data: ${stale.join(', ')}.`)
    anyUpdate = true
  }

  // Sync certifications array.
  if (JSON.stringify(document.certifications) !== JSON.stringify(seedProfile.certifications)) {
    await ProfileModel.updateOne(
      { key: 'main' },
      { $set: { certifications: seedProfile.certifications } },
    )
    logInfo('Synced profile certifications from static data.')
    anyUpdate = true
  }

  // Sync strengths array.
  if (JSON.stringify(document.strengths) !== JSON.stringify(seedProfile.strengths)) {
    await ProfileModel.updateOne(
      { key: 'main' },
      { $set: { strengths: seedProfile.strengths } },
    )
    logInfo('Synced profile strengths from static data.')
    anyUpdate = true
  }

  // Append new timeline entries not yet in MongoDB (matched by title).
  const existingTimeline = ((document as any).timeline ?? []) as Array<{
    title: string
    period: string
    detail: string
  }>
  const existingTitles = new Set(existingTimeline.map((t) => t.title))
  const newTimelineEntries = seedProfile.timeline.filter((t) => !existingTitles.has(t.title))
  if (newTimelineEntries.length > 0) {
    await ProfileModel.updateOne(
      { key: 'main' },
      { $push: { timeline: { $each: newTimelineEntries, $position: 0 } } },
    )
    logInfo(`Synced ${newTimelineEntries.length} timeline entry(ies) from static data.`)
    anyUpdate = true
  }

  // Update detail and period for existing timeline entries when seed values changed.
  for (const seedEntry of seedProfile.timeline) {
    const existing = existingTimeline.find((t) => t.title === seedEntry.title)
    if (!existing) continue // newly inserted above
    if (existing.detail !== seedEntry.detail || existing.period !== seedEntry.period) {
      await ProfileModel.updateOne(
        { key: 'main', 'timeline.title': seedEntry.title },
        {
          $set: {
            'timeline.$.detail': seedEntry.detail,
            'timeline.$.period': seedEntry.period,
          },
        },
      )
      logInfo(`Synced timeline entry "${seedEntry.title}" from static data.`)
      anyUpdate = true
    }
  }

  if (anyUpdate) {
    const updated = (await ProfileModel.findOne().lean().exec()) as ProfileRecord
    return stripProfileMetadata(updated)
  }

  return stripProfileMetadata(document)
}

export async function getProfileContent() {
  if (!isDatabaseReady()) {
    logWarn('MongoDB not ready. Serving profile from static seed data.')
    return seedProfile
  }

  return readMongoProfile()
}
