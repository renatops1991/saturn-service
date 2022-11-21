import { setupApp } from '@/main/config/app'
import { MongoHelper } from '@/infra/mongodb/mongo-helper'
import { Express } from 'express'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'
import request from 'supertest'
import dotenv from 'dotenv'

let userCollection: Collection
let app: Express

dotenv.config()
describe('User routes', () => {
  beforeAll(async () => {
    app = await setupApp()
    await MongoHelper.connect(process.env.MONGODB_URL_TEST)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    userCollection = MongoHelper.getCollection('users')
    await userCollection.deleteMany({})
  })
  describe('Create', () => {
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

  describe('Login', () => {
    it('Should return name, email and accessToken', async () => {
      const password = await hash('123', 12)
      await userCollection.insertOne({
        name: 'John Foo Bar',
        email: 'john@example.com',
        password
      })
      await request(app)
        .post('/api/sign-in')
        .send({
          email: 'john@example.com',
          password: '123'
        })
        .expect(200)
    })
  })
})
