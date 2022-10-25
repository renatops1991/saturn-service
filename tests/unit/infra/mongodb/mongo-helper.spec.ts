import { MongoConnect } from '@/infra/mongodb/mongo-helper'

describe('MongoConnect', () => {
  beforeAll(async () => {
    await MongoConnect.connect(process.env.MONGODB_URL)
  })

  afterAll(async () => {
    await MongoConnect.disconnect()
  })
  it('Should correctly connect MongoDB ', async () => {
    const userCollection = MongoConnect.getCollection('users')
    expect(userCollection).toBeTruthy()
  })
})
