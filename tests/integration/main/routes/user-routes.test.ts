import { setupApp } from '@/main/config/app'
import { MongoHelper } from '@/infra/mongodb/mongo-helper'
import { fixtureUpdateUser } from '@/tests/unit/presentation/fixtures/fixtures-user'
import { hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import request from 'supertest'
import dotenv from 'dotenv'
import type { Express } from 'express'
import type { Collection, InsertOneResult } from 'mongodb'

let userCollection: Collection
let app: Express

dotenv.config()
describe('User routes', () => {
  beforeAll(async () => {
    app = await setupApp()
    await MongoHelper.connect(process.env.MONGODB_URL_TEST as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    userCollection = MongoHelper.getCollection('users')
    await userCollection.deleteMany({})
  })

  const makeUser = async (): Promise<InsertOneResult<Document>> => {
    const password = await hash('123', 12)
    return await userCollection.insertOne({
      name: 'John Foo Bar',
      email: 'john@example.com',
      password,
      role: 'admin',
      confirmUser: false,
      accessToken: sign('foo', process.env.JWT_SECRET as string)
    })
  }
  describe('Create', () => {
    it('Should return an user on success', async () => {
      await request(app)
        .post('/api/sign-up')
        .send({
          name: 'John Foo Bar',
          email: 'foo@bar.com',
          password: '123',
          passwordConfirmation: '123',
          confirmUser: false
        })
        .expect(201)
    })
  })

  describe('Login', () => {
    it('Should return name, email and accessToken', async () => {
      await makeUser()
      await request(app)
        .post('/api/sign-in')
        .send({
          email: 'john@example.com',
          password: '123'
        })
        .expect(200)
    })

    it('Should returns 401 error if invalid credentials', async () => {
      await request(app)
        .post('/api/sign-in')
        .send({
          email: 'john@example.com',
          password: '123'
        })
        .expect(401)
    })
  })

  describe('UpdateConfirmUser', () => {
    it('Should update confirmUser field on succeeds', async () => {
      const createUser = await makeUser()
      const id = createUser.insertedId
      const accessToken = sign({ id }, process.env.JWT_SECRET as string)
      await userCollection.updateOne(
        {
          _id: id
        }, {
          $set: {
            accessToken
          }
        }
      )
      await request(app)
        .patch('/api/user/confirm')
        .set('x-access-token', accessToken)
        .send({
          confirmUser: true
        })
        .expect(204)
    })
  })

  describe('Update', () => {
    it('Should update user fields on succeeds', async () => {
      const createUser = await makeUser()
      const id = createUser.insertedId
      const accessToken = sign({ id }, process.env.JWT_SECRET as string)
      await userCollection.updateOne(
        {
          _id: id
        }, {
          $set: {
            accessToken
          }
        }
      )
      await request(app)
        .put('/api/user')
        .set('x-access-token', accessToken)
        .send(
          fixtureUpdateUser()
        )
        .expect(200)
    })
  })

  describe('UpdateUserPassword', () => {
    it('Should update user password field on succeeds', async () => {
      const createUser = await makeUser()
      const id = createUser.insertedId
      const user = await userCollection.findOne(
        {
          _id: id
        }, {
          projection: {
            accessToken: 1
          }
        }
      )
      await request(app)
        .patch('/api/user/redefine-password')
        .set('x-access-token', user?.accessToken)
        .send({
          password: 'bar',
          passwordConfirmation: 'bar'
        })
        .expect(204)
    })
  })

  describe('GetUser', () => {
    it('Should return user on succeeds', async () => {
      const createUser = await makeUser()
      const id = createUser.insertedId
      const user = await userCollection.findOne(
        {
          _id: id
        }, {
          projection: {
            accessToken: 1
          }
        }
      )
      await request(app)
        .get('/api/user')
        .set('x-access-token', user?.accessToken)
        .expect(200)
    })
  })

  describe('GetAllUsers', () => {
    it('Should return users on succeeds', async () => {
      const createUser = await makeUser()
      const id = createUser.insertedId
      const user = await userCollection.findOne(
        {
          _id: id
        }, {
          projection: {
            accessToken: 1
          }
        }
      )
      await request(app)
        .get('/users')
        .set('x-access-token', user?.accessToken)
        .query({ email: 'john@example.com' })
        .expect(200)
    })
  })
})
