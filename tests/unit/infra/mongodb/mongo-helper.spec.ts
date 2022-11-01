import { MongoHelper } from '@/infra/mongodb/mongo-helper'

describe('MongoHelper', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGODB_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  it('Should correctly connect MongoDB ', async () => {
    const userCollection = MongoHelper.getCollection('users')
    expect(userCollection).toBeTruthy()
  })
})
