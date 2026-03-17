import { getProfileContent } from '../profile/profile.store.js'
import { getProjects } from '../projects/projects.store.js'
import { getSkillGroups } from '../skills/skills.store.js'
import { getTestimonials } from '../testimonials/testimonials.store.js'
import { logInfo } from '../../utils/logger.js'

// Seed the Mongo collections once on startup so admin CRUD has real documents to work with.
export async function seedContentCollections() {
  const [profile, projects, skills, testimonials] = await Promise.all([
    getProfileContent(),
    getProjects(),
    getSkillGroups(),
    getTestimonials(),
  ])

  logInfo(
    `Content seed ready: profile=${profile.name}, projects=${projects.length}, skills=${skills.length}, testimonials=${testimonials.length}.`,
  )
}
