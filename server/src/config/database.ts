import { env } from './env.js'
import { logInfo, logWarn } from '../utils/logger.js'

function getDatabaseTargetLabel(uri: string) {
  try {
    const { host } = new URL(uri)
    return host || 'configured target'
  } catch {
    return 'configured target'
  }
}

export async function connectDatabase() {
  if (!env.MONGODB_URI) {
    logWarn('MongoDB URI not set. Skipping database connection.')
    return false
  }

  const target = getDatabaseTargetLabel(env.MONGODB_URI)
  logInfo(`MongoDB URI detected for ${target}. Connection wiring is ready for the next step.`)
  return true
}
