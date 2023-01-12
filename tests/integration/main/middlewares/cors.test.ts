import { setupApp } from '@/main/config/app'
import type { Express } from 'express'
import request from 'supertest'

let app: Express
describe('Cors Middleware', () => {
  beforeAll(async () => {
    app = await setupApp()
  })
  it('Should enable Cors', async () => {
    app.get('/cors-test', (request, response) => {
      response.send()
    })
    await request(app)
      .get('/cors-test')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
