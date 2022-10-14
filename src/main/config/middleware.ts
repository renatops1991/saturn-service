import { bodyParse, contentType, cors } from '@/main/middlewares'
import { Express } from 'express'

export default (app: Express): void => {
  app.use(bodyParse)
  app.use(cors)
  app.use(contentType)
}
