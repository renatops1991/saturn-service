import setupMiddleware from '@/main/config/middleware'
import express, { Express } from 'express'

export const setupApp = async (): Promise<Express> => {
  const app = express()
  setupMiddleware(app)

  return app
}
