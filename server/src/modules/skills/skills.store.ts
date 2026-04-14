import { isDatabaseReady } from '../../config/database.js'
import type { SkillGroup } from '../../types/content.js'
import { logInfo, logWarn } from '../../utils/logger.js'
import { skillGroups as seedSkillGroups } from './skills.data.js'
import { SkillGroupModel } from './skills.model.js'

type SkillGroupRecord = SkillGroup & {
  order: number
  _id?: unknown
}

function stripSkillGroupMetadata(document: SkillGroupRecord) {
  const { _id, order, ...skillGroup } = document
  return skillGroup
}

async function readMongoSkillGroups() {
  const documents = (await SkillGroupModel.find()
    .sort({ order: 1 })
    .lean()
    .exec()) as SkillGroupRecord[]

  if (documents.length === 0) {
    await SkillGroupModel.insertMany(
      seedSkillGroups.map((skillGroup, order) => ({ order, ...skillGroup })),
    )
    logInfo('Seeded skills collection from static data.')
    return seedSkillGroups
  }

  let anyUpdate = false

  // Insert new skill groups not yet in MongoDB.
  const existingEyebrows = new Set(documents.map((d) => d.eyebrow))
  const newGroups = seedSkillGroups.filter((g) => !existingEyebrows.has(g.eyebrow))
  if (newGroups.length > 0) {
    const lastOrder = Math.max(...documents.map((d) => d.order))
    await SkillGroupModel.insertMany(
      newGroups.map((group, i) => ({ order: lastOrder + 1 + i, ...group })),
    )
    logInfo(`Synced ${newGroups.length} new skill group(s) from static data.`)
    anyUpdate = true
  }

  // Sync content and order for existing skill groups.
  let contentSynced = 0
  let orderSynced = 0
  for (const [i, seedGroup] of seedSkillGroups.entries()) {
    const doc = documents.find((d) => d.eyebrow === seedGroup.eyebrow)
    if (!doc) continue // newly inserted above

    const patch: Record<string, unknown> = {}

    // Replace items array entirely so renames propagate (not just appends).
    if (JSON.stringify(doc.items) !== JSON.stringify(seedGroup.items)) {
      patch.items = seedGroup.items
    }

    if (doc.title !== seedGroup.title) {
      patch.title = seedGroup.title
    }

    if (doc.description !== seedGroup.description) {
      patch.description = seedGroup.description
    }

    // Sync display order.
    if (doc.order !== i) {
      patch.order = i
      orderSynced++
    }

    if (Object.keys(patch).length > 0) {
      await SkillGroupModel.updateOne({ eyebrow: seedGroup.eyebrow }, { $set: patch })
      const hasContentChange = 'items' in patch || 'title' in patch || 'description' in patch
      if (hasContentChange) contentSynced++
    }
  }

  if (contentSynced > 0) {
    logInfo(`Synced content for ${contentSynced} skill group(s) from static data.`)
    anyUpdate = true
  }
  if (orderSynced > 0) {
    logInfo(`Synced order for ${orderSynced} skill group(s) from static data.`)
    anyUpdate = true
  }

  if (anyUpdate) {
    const updated = (await SkillGroupModel.find()
      .sort({ order: 1 })
      .lean()
      .exec()) as SkillGroupRecord[]
    return updated.map(stripSkillGroupMetadata)
  }

  return documents.map(stripSkillGroupMetadata)
}

export async function getSkillGroups() {
  if (!isDatabaseReady()) {
    logWarn('MongoDB not ready. Serving skills from static seed data.')
    return seedSkillGroups
  }

  return readMongoSkillGroups()
}
