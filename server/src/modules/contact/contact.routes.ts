import { Router } from 'express'
import { z } from 'zod'
import { logInfo } from '../../utils/logger.js'
import { createContactSubmission } from './contact.store.js'

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email(),
  inquiryType: z.string().trim().min(2).max(80),
  message: z.string().trim().min(10).max(2000),
})

export const contactRouter = Router()

contactRouter.post('/', async (request, response, next) => {
  try {
    // Validate at the edge so the store only sees clean submission data.
    const result = contactSchema.safeParse(request.body)

    if (!result.success) {
      response.status(400).json({
        message: 'Please provide a valid name, email, inquiry type, and message.',
        issues: result.error.flatten(),
      })
      return
    }

    const submission = await createContactSubmission(result.data)

    logInfo(`Stored contact submission ${submission.id} from ${submission.email}`)

    response.status(201).json({
      id: submission.id,
      receivedAt: submission.receivedAt,
      message: 'Message received and saved. Thanks for reaching out.',
    })
  } catch (error) {
    next(error)
  }
})
