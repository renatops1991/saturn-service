
import request from 'supertest'
import app from '@/main/config/app'

describe('BodyParse Middleware', () => {
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
