import setupMiddleware from '@/main/config/middleware'
import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

const app = express()
setupMiddleware(app)
export default app
