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

  // Sync scalar text fields that may have been updated in seed data.
  // Strengths and certifications are intentionally excluded — admins may have edited those.
  const textFields = ['summary', 'intro', 'about', 'availability', 'title', 'location'] as const
  const stale = textFields.filter(
    (field) => document[field] !== seedProfile[field],
  )
  if (stale.length > 0) {
    await ProfileModel.updateOne(
      { key: 'main' },
      { $set: Object.fromEntries(stale.map((f) => [f, seedProfile[f]])) },
    )
    logInfo(`Synced profile field(s) from static data: ${stale.join(', ')}.`)
  }

  // Append timeline entries from seed that are not yet in MongoDB (matched by title).
  const existingTitles = new Set(
    ((document as any).timeline ?? []).map((t: { title: string }) => t.title),
  )
  const newTimelineEntries = seedProfile.timeline.filter(
    (t) => !existingTitles.has(t.title),
  )
  if (newTimelineEntries.length > 0) {
    await ProfileModel.updateOne(
      { key: 'main' },
      { $push: { timeline: { $each: newTimelineEntries, $position: 0 } } },
    )
    logInfo(`Synced ${newTimelineEntries.length} timeline entry(ies) from static data.`)
  }

  if (stale.length > 0 || newTimelineEntries.length > 0) {
    const updated = (await ProfileModel.findOne().lean().exec()) as ProfileRecord
    return stripProfileMetadata(updated)
  }

  return stripProfileMetadata(document)
}

export async function getProfileContent() {
  // Keep local development working even if Mongo is temporarily unavailable.
  if (!isDatabaseReady()) {
    logWarn('MongoDB not ready. Serving profile from static seed data.')
    return seedProfile
  }

  return readMongoProfile()
}
