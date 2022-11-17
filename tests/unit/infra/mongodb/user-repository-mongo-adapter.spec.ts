import { MongoHelper } from '@/infra/mongodb/mongo-helper'
import { UserRepositoryMongoAdapter } from '@/infra/mongodb/user-repository-mongo-adapter'
import { fixturesCreateUser } from '@/tests/unit/presentation/fixtures/fixtures-user'
import { Collection } from 'mongodb'

const makeSut = (): UserRepositoryMongoAdapter => {
  return new UserRepositoryMongoAdapter()
}

let userCollection: Collection
describe('UserRepositoryMongoAdapter', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGODB_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    userCollection = MongoHelper.getCollection('users')
    await userCollection.deleteMany({})
  })

  it('Should return correct an user on create success', async () => {
    const sut = makeSut()
    const expectedResponse = await sut.create(fixturesCreateUser())
    expect(expectedResponse).toBeTruthy()
    expect(expectedResponse.id).toBeTruthy()
    expect(expectedResponse.name).toEqual(fixturesCreateUser().name)
    expect(expectedResponse.email).toEqual(fixturesCreateUser().email)
  })
  it('Should return correct an user on loadByEmail success', async () => {
    const sut = makeSut()
    await userCollection.insertOne(fixturesCreateUser())
    const expectedUser = await sut.loadByEmail('foo@example.com')
    expect(expectedUser).toBeTruthy()
    expect(expectedUser.id).toBeTruthy()
    expect(expectedUser.name).toEqual(fixturesCreateUser().name)
    expect(expectedUser.email).toEqual(fixturesCreateUser().email)
    expect(expectedUser.password).toEqual(fixturesCreateUser().password)
  })

  it('Should return null if loadByEmail method is fail', async () => {
    const sut = makeSut()
    const expectedUser = await sut.loadByEmail('foo@foo.com')
    expect(expectedUser).toBeFalsy()
  })
})
