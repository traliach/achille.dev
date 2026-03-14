import { Router } from 'express'
import { testimonials } from './testimonials.data.js'

export const testimonialsRouter = Router()

testimonialsRouter.get('/', (_request, response) => {
  response.json(testimonials)
})
