import {
  startTransition,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react'
import {
  createInitialContactForm,
  fallbackProfile,
  projectSummaries as fallbackProjects,
  skillGroups as fallbackSkillGroups,
  testimonialQuotes as fallbackTestimonials,
} from '../features/portfolio/content'
import {
  fetchHealth,
  fetchProfile,
  fetchProjects,
  fetchSkills,
  fetchTestimonials,
  submitContact,
} from '../services/api'
import type {
  ApiHealth,
  ApiState,
  ContactSubmissionInput,
  ProfileContent,
  ProjectSummary,
  SkillGroup,
  SubmitState,
  Testimonial,
} from '../types/site'

export function usePortfolioData() {
  const [apiState, setApiState] = useState<ApiState>('loading')
  const [health, setHealth] = useState<ApiHealth | null>(null)
  const [profile, setProfile] = useState<ProfileContent>(fallbackProfile)
  const [projects, setProjects] = useState<ProjectSummary[]>(fallbackProjects)
  const [skills, setSkills] = useState<SkillGroup[]>(fallbackSkillGroups)
  const [testimonials, setTestimonials] =
    useState<Testimonial[]>(fallbackTestimonials)
  const [contactForm, setContactForm] =
    useState<ContactSubmissionInput>(createInitialContactForm)
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  useEffect(() => {
    let active = true

    async function loadData() {
      const [
        healthResult,
        profileResult,
        projectResult,
        skillResult,
        testimonialResult,
      ] =
        await Promise.allSettled([
          fetchHealth(),
          fetchProfile(),
          fetchProjects(),
          fetchSkills(),
          fetchTestimonials(),
        ])

      if (!active) {
        return
      }

      startTransition(() => {
        if (healthResult.status === 'fulfilled') {
          setHealth(healthResult.value)
          setApiState('online')
        } else {
          setApiState('offline')
        }

        if (profileResult.status === 'fulfilled') {
          setProfile(profileResult.value)
        }

        if (projectResult.status === 'fulfilled') {
          setProjects(projectResult.value)
        }

        if (skillResult.status === 'fulfilled') {
          setSkills(skillResult.value)
        }

        if (testimonialResult.status === 'fulfilled') {
          setTestimonials(testimonialResult.value)
        }
      })
    }

    void loadData()

    return () => {
      active = false
    }
  }, [])

  function handleContactChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target

    setContactForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitState('submitting')
    setSubmitMessage('')

    try {
      const result = await submitContact(contactForm)
      setSubmitState('success')
      setSubmitMessage(result.message)
      setContactForm(createInitialContactForm())
    } catch (error) {
      setSubmitState('error')
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : 'Unable to send message right now.',
      )
    }
  }

  return {
    apiState,
    contactForm,
    handleContactChange,
    handleContactSubmit,
    health,
    profile,
    projects,
    skills,
    submitMessage,
    submitState,
    testimonials,
  }
}
