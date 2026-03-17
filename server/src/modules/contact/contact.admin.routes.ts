import { Router } from 'express'
import { z } from 'zod'
import {
  listContactSubmissions,
  updateContactSubmissionStatus,
} from './contact.store.js'

const contactStatusSchema = z.object({
  status: z.enum(['new', 'reviewed', 'replied', 'archived']),
})

export const adminContactRouter = Router()

adminContactRouter.get('/', async (_request, response, next) => {
  try {
    const submissions = await listContactSubmissions()

    response.json({
      count: submissions.length,
      latest: submissions[0] ?? null,
      items: submissions,
    })
  } catch (error) {
    next(error)
  }
})

adminContactRouter.patch('/:id/status', async (request, response, next) => {
  try {
    const result = contactStatusSchema.safeParse(request.body)

    if (!result.success) {
      response.status(400).json({
        message: 'Please provide a valid contact status.',
        issues: result.error.flatten(),
      })
      return
    }

    const submission = await updateContactSubmissionStatus(
      request.params.id,
      result.data.status,
    )

    if (!submission) {
      response.status(404).json({
        message: 'Contact submission not found.',
      })
      return
    }

    response.json(submission)
  } catch (error) {
    next(error)
  }
})
