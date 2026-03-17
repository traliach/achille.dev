import type {
  ApiHealth,
  ContactSubmissionInput,
  ContactSubmissionResult,
  ProfileContent,
  ProjectSummary,
  SkillGroup,
  Testimonial,
  TestimonialSubmissionInput,
  TestimonialSubmissionResult,
} from '../types/site'

const REQUEST_TIMEOUT_MS = 8000

async function fetchWithTimeout(
  input: RequestInfo | URL,
  init?: RequestInit,
) {
  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    return await fetch(input, {
      ...init,
      signal: controller.signal,
    })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error(`Request timed out after ${REQUEST_TIMEOUT_MS}ms`)
    }

    throw error
  } finally {
    window.clearTimeout(timeoutId)
  }
}

async function parseJson<T>(response: Response, context: string): Promise<T> {
  const contentType = response.headers.get('content-type') ?? ''

  if (!contentType.includes('application/json')) {
    const bodyPreview = (await response.text().catch(() => '')).slice(0, 200)
    console.error(
      `[api] ${context} returned non-JSON content-type "${contentType}"`,
      bodyPreview,
    )
    throw new Error('Expected JSON response from API')
  }

  try {
    return (await response.json()) as T
  } catch (error) {
    console.error(`[api] ${context} returned invalid JSON`, error)
    throw new Error('Invalid JSON response from API')
  }
}

async function readJson<T>(path: string): Promise<T> {
  console.info(`[api] GET ${path}`)
  const response = await fetchWithTimeout(path)

  if (!response.ok) {
    console.error(`[api] GET ${path} failed with status ${response.status}`)
    throw new Error(`Request failed: ${response.status}`)
  }

  console.info(`[api] GET ${path} ok`)
  return parseJson<T>(response, `GET ${path}`)
}

function extractErrorMessage(errorBody: unknown, fallback: string) {
  if (errorBody && typeof errorBody === 'object' && 'message' in errorBody) {
    const message = errorBody.message

    if (typeof message === 'string' && message.trim()) {
      return message
    }
  }

  return fallback
}

export function fetchHealth() {
  return readJson<ApiHealth>('/api/health')
}

export function fetchProfile() {
  return readJson<ProfileContent>('/api/profile')
}

export function fetchProjects() {
  return readJson<ProjectSummary[]>('/api/projects')
}

export function fetchSkills() {
  return readJson<SkillGroup[]>('/api/skills')
}

export function fetchTestimonials() {
  return readJson<Testimonial[]>('/api/testimonials')
}

export async function submitContact(payload: ContactSubmissionInput) {
  console.info('[api] POST /api/contact')
  const response = await fetchWithTimeout('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as
      | { message?: string }
      | null

    console.error(`[api] POST /api/contact failed with status ${response.status}`)
    throw new Error(
      extractErrorMessage(errorBody, `Request failed: ${response.status}`),
    )
  }

  console.info('[api] POST /api/contact ok')
  return parseJson<ContactSubmissionResult>(response, 'POST /api/contact')
}

export async function submitTestimonial(payload: TestimonialSubmissionInput) {
  console.info('[api] POST /api/testimonials')
  const response = await fetchWithTimeout('/api/testimonials', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as
      | { message?: string }
      | null

    console.error(`[api] POST /api/testimonials failed with status ${response.status}`)
    throw new Error(
      extractErrorMessage(errorBody, `Request failed: ${response.status}`),
    )
  }

  console.info('[api] POST /api/testimonials ok')
  return parseJson<TestimonialSubmissionResult>(
    response,
    'POST /api/testimonials',
  )
}
