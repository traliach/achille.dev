import { Router } from 'express'
import { adminContactRouter } from '../contact/contact.admin.routes.js'
import { adminProfileRouter } from '../profile/profile.admin.routes.js'
import { adminProjectsRouter } from '../projects/projects.admin.routes.js'
import { adminSkillsRouter } from '../skills/skills.admin.routes.js'
import { adminTestimonialsRouter } from '../testimonials/testimonials.admin.routes.js'

export const adminRouter = Router()

adminRouter.use('/profile', adminProfileRouter)
adminRouter.use('/projects', adminProjectsRouter)
adminRouter.use('/skills', adminSkillsRouter)
adminRouter.use('/testimonials', adminTestimonialsRouter)
adminRouter.use('/contact', adminContactRouter)
