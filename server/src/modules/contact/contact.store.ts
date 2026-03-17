import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { isDatabaseReady } from '../../config/database.js'
import type {
  ContactSubmission,
  ContactSubmissionInput,
  ContactSubmissionStatus,
} from '../../types/content.js'
import { logInfo, logWarn } from '../../utils/logger.js'
import { ContactSubmissionModel } from './contact.model.js'

const storageFileUrl = new URL(
  '../../../data/contact-submissions.json',
  import.meta.url,
)

const storedSubmissionSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  inquiryType: z.string(),
  message: z.string(),
  receivedAt: z.string(),
  status: z.enum(['new', 'reviewed', 'replied', 'archived']),
})

const storedSubmissionListSchema = z.array(storedSubmissionSchema)

let writeQueue = Promise.resolve()

async function ensureStore() {
  const storagePath = fileURLToPath(storageFileUrl)

  await mkdir(dirname(storagePath), { recursive: true })

  try {
    await readFile(storagePath, 'utf8')
  } catch {
    await writeFile(storagePath, '[]\n', 'utf8')
  }
}

async function readSubmissions() {
  await ensureStore()

  const content = await readFile(storageFileUrl, 'utf8')
  const parsed = JSON.parse(content) as unknown

  return storedSubmissionListSchema.parse(parsed) as ContactSubmission[]
}

async function writeSubmissions(submissions: ContactSubmission[]) {
  await writeFile(
    storageFileUrl,
    `${JSON.stringify(submissions, null, 2)}\n`,
    'utf8',
  )
}

function queueWrite<T>(operation: () => Promise<T>) {
  const next = writeQueue.then(operation, operation)
  writeQueue = next.then(
    () => undefined,
    () => undefined,
  )

  return next
}

async function listMongoSubmissions() {
  // Prefer Mongo when available, but keep the file store as a safe local fallback.
  const documents = await ContactSubmissionModel.find()
    .sort({ receivedAt: -1 })
    .lean()
    .exec()

  return documents.map((document) => {
    const { _id, ...submission } = document as ContactSubmission & {
      _id: unknown
    }

    return submission
  })
}

async function createMongoSubmission(input: ContactSubmissionInput) {
  const submission: ContactSubmission = {
    id: randomUUID(),
    receivedAt: new Date().toISOString(),
    status: 'new',
    ...input,
  }

  await ContactSubmissionModel.create(submission)

  return submission
}

export async function listContactSubmissions() {
  if (isDatabaseReady()) {
    logInfo('Listing contact submissions from MongoDB.')
    return listMongoSubmissions()
  }

  logWarn('MongoDB not ready. Listing contact submissions from file fallback.')
  return readSubmissions()
}

export async function updateContactSubmissionStatus(
  id: string,
  status: ContactSubmissionStatus,
) {
  if (isDatabaseReady()) {
    logInfo(`Updating contact submission ${id} status to ${status} in MongoDB.`)

    const document = await ContactSubmissionModel.findOneAndUpdate(
      { id },
      { status },
      { new: true },
    )
      .lean()
      .exec()

    if (!document) {
      return null
    }

    const { _id, ...submission } = document as ContactSubmission & {
      _id: unknown
    }

    return submission
  }

  logWarn(`MongoDB not ready. Updating contact submission ${id} status in file fallback.`)

  return queueWrite(async () => {
    const submissions = await readSubmissions()
    const index = submissions.findIndex((submission) => submission.id === id)

    if (index === -1) {
      return null
    }

    const currentSubmission = submissions[index]

    if (!currentSubmission) {
      return null
    }

    const updatedSubmission: ContactSubmission = {
      ...currentSubmission,
      status,
    }

    submissions[index] = updatedSubmission

    await writeSubmissions(submissions)

    return updatedSubmission
  })
}

export async function createContactSubmission(input: ContactSubmissionInput) {
  if (isDatabaseReady()) {
    logInfo(`Saving contact submission for ${input.email} to MongoDB.`)
    return createMongoSubmission(input)
  }

  logWarn(`MongoDB not ready. Saving contact submission for ${input.email} to file fallback.`)
  const submission: ContactSubmission = {
    id: randomUUID(),
    receivedAt: new Date().toISOString(),
    status: 'new',
    ...input,
  }

  await queueWrite(async () => {
    const submissions = await readSubmissions()
    submissions.unshift(submission)
    await writeSubmissions(submissions)
  })

  return submission
}
