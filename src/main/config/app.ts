import setupMiddleware from '@/main/config/middleware'
import setupRoutes from '@/main/config/routes'
import express, { type Express } from 'express'

export const setupApp = async (): Promise<Express> => {
  const app = express()
  setupMiddleware(app)
  setupRoutes(app)

  return app
}
