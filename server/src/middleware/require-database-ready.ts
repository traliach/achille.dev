import type { RequestHandler } from 'express'
import { isDatabaseReady } from '../config/database.js'

// Admin writes depend on Mongo, so fail fast if the database is not connected.
export const requireDatabaseReady: RequestHandler = (_request, response, next) => {
  if (!isDatabaseReady()) {
    response.status(503).json({
      message: 'Database is not ready yet.',
    })
    return
  }

  next()
}
