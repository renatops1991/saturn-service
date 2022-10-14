
import request from 'supertest'
import { setupApp } from '@/main/config/app'
import { Express } from 'express'

let app: Express

describe('BodyParse Middleware', () => {
  beforeAll(async () => {
    app = await setupApp()
  })
  it('Should correct parse as json', async () => {
    app.post('/body-parse-test', (request, response) => {
      response.send(request.body)
    })
    await request(app)
      .post('/body-parse-test')
      .send({ name: 'John Foo Bar' })
      .expect({ name: 'John Foo Bar' })
  })
})
