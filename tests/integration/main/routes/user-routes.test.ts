import { setupApp } from '@/main/config/app'
import { MongoConnect } from '@/infra/mongodb/mongo-helper'
import { Express } from 'express'
import { Collection } from 'mongodb'
import request from 'supertest'
import dotenv from 'dotenv'

let userCollection: Collection
let app: Express

dotenv.config()
describe('User routes', () => {
  beforeAll(async () => {
    app = await setupApp()
    await MongoConnect.connect(process.env.MONGODB_URL_TEST)
  })

  afterAll(async () => {
    await MongoConnect.disconnect()
  })

  beforeEach(async () => {
    userCollection = MongoConnect.getCollection('users')
    await userCollection.deleteMany({})
  })

  it('Should return an user on success', async () => {
    await request(app)
      .post('/api/create')
      .send({
        name: 'John Foo Bar',
        email: 'foo@bar.com',
        password: '123',
        passwordConfirmation: '123',
        confirmUser: false
      })
      .expect(200)
  })
})
