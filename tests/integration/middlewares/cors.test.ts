import app from '@/main/config/app'

import request from 'supertest'

describe('Cors Middleware', () => {
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
