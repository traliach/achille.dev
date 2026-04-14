import { isDatabaseReady } from '../../config/database.js'
import type { ProjectSummary } from '../../types/content.js'
import { logInfo, logWarn } from '../../utils/logger.js'
import { projects as seedProjects } from './projects.data.js'
import { ProjectModel } from './projects.model.js'

type ProjectRecord = ProjectSummary & {
  order: number
  _id?: unknown
}

function stripProjectMetadata(document: ProjectRecord) {
  const { _id, order, ...project } = document
  return project
}

const SCALAR_FIELDS = [
  'summary', 'challenge', 'solution', 'role', 'timeframe', 'featured',
] as const

const ARRAY_FIELDS = ['stack', 'outcomes'] as const

async function readMongoProjects() {
  const documents = (await ProjectModel.find()
    .sort({ order: 1 })
    .lean()
    .exec()) as ProjectRecord[]

  if (documents.length === 0) {
    await ProjectModel.insertMany(
      seedProjects.map((project, order) => ({ order, ...project })),
    )
    logInfo('Seeded projects collection from static data.')
    return seedProjects
  }

  let anyUpdate = false

  // Insert new projects not yet in MongoDB.
  const existingTitles = new Set(documents.map((d) => d.title))
  const newProjects = seedProjects.filter((p) => !existingTitles.has(p.title))
  if (newProjects.length > 0) {
    const lastOrder = Math.max(...documents.map((d) => d.order))
    await ProjectModel.insertMany(
      newProjects.map((project, i) => ({ order: lastOrder + 1 + i, ...project })),
    )
    logInfo(`Synced ${newProjects.length} new project(s) from static data.`)
    anyUpdate = true
  }

  // Update content for existing projects when seed values have changed.
  let contentSynced = 0
  for (const seedProject of seedProjects) {
    const doc = documents.find((d) => d.title === seedProject.title)
    if (!doc) continue // newly inserted above

    const patch: Record<string, unknown> = {}

    for (const field of SCALAR_FIELDS) {
      if (doc[field] !== seedProject[field]) {
        patch[field] = seedProject[field]
      }
    }

    for (const field of ARRAY_FIELDS) {
      if (JSON.stringify(doc[field]) !== JSON.stringify(seedProject[field])) {
        patch[field] = seedProject[field]
      }
    }

    if (JSON.stringify(doc.metrics) !== JSON.stringify(seedProject.metrics)) {
      patch.metrics = seedProject.metrics
    }

    // URL fields may be undefined or empty string — normalise before comparing.
    for (const field of ['repoUrl', 'liveUrl'] as const) {
      if ((doc[field] ?? '') !== (seedProject[field] ?? '')) {
        patch[field] = seedProject[field]
      }
    }

    if (Object.keys(patch).length > 0) {
      await ProjectModel.updateOne({ title: seedProject.title }, { $set: patch })
      contentSynced++
    }
  }

  if (contentSynced > 0) {
    logInfo(`Synced content for ${contentSynced} existing project(s) from static data.`)
    anyUpdate = true
  }

  if (anyUpdate) {
    const updated = (await ProjectModel.find()
      .sort({ order: 1 })
      .lean()
      .exec()) as ProjectRecord[]
    return updated.map(stripProjectMetadata)
  }

  return documents.map(stripProjectMetadata)
}

export async function getProjects() {
  if (!isDatabaseReady()) {
    logWarn('MongoDB not ready. Serving projects from static seed data.')
    return seedProjects
  }

  return readMongoProjects()
}
