import { setupApp } from '@/main/config/app'
import type { Express } from 'express'
import request from 'supertest'

let app: Express
describe('ContentType Middleware', () => {
  beforeAll(async () => {
    app = await setupApp()
  })
  it('Should return default content type as json', async () => {
    app.get('/content-type-test', (request, response) => {
      response.send('')
    })
    await request(app)
      .get('/content-type-test')
      .expect('content-type', /json/)
  })

  it('Should return xml content type when forced', async () => {
    app.get('/content-type-test-xml', (request, response) => {
      response.type('xml')
      response.send('')
    })
    await request(app)
      .get('/content-type-test-xml')
      .expect('content-type', /xml/)
  })
})
