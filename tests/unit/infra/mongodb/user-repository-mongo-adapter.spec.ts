import { MongoHelper } from '@/infra/mongodb/mongo-helper'
import { UserRepositoryMongoAdapter } from '@/infra/mongodb/user-repository-mongo-adapter'
import { fixturesCreateUser, fixturesUpdateUser, fixturesUpdateUserOutput } from '@/tests/unit/presentation/fixtures/fixtures-user'
import { Collection } from 'mongodb'
import MockDate from 'mockdate'

const makeSut = (): UserRepositoryMongoAdapter => {
  return new UserRepositoryMongoAdapter()
}

let userCollection: Collection
describe('UserRepositoryMongoAdapter', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGODB_URL)
    MockDate.set(new Date())
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
    MockDate.reset()
  })

  beforeEach(async () => {
    userCollection = MongoHelper.getCollection('users')
    await userCollection.deleteMany({})
  })

  describe('Create', () => {
    it('Should return correct an user if create method on succeeds', async () => {
      const sut = makeSut()
      const expectedResponse = await sut.create(fixturesCreateUser())
      expect(expectedResponse).toBeTruthy()
      expect(expectedResponse.name).toEqual(fixturesCreateUser().name)
      expect(expectedResponse.email).toEqual(fixturesCreateUser().email)
    })
  })

  describe('LoadByEmail', () => {
    it('Should return correct an user if loadByEmail method on succeeds', async () => {
      const sut = makeSut()
      await userCollection.insertOne(fixturesCreateUser())
      const expectedUser = await sut.loadByEmail('foo@example.com')
      expect(expectedUser).toBeTruthy()
      expect(expectedUser.id).toBeTruthy()
      expect(expectedUser.name).toEqual(fixturesCreateUser().name)
      expect(expectedUser.email).toEqual(fixturesCreateUser().email)
      expect(expectedUser.password).toEqual(fixturesCreateUser().password)
    })
    it('Should return false if loadByEmail method is fail', async () => {
      const sut = makeSut()
      const expectedUser = await sut.loadByEmail('foo@foo.com')
      expect(expectedUser).toBeFalsy()
    })
  })

  describe('UpdateAccessToken', () => {
    it('Should update user accessToken if updateAccessToken method on succeeds', async () => {
      const sut = makeSut()
      const createUser = await userCollection.insertOne(fixturesCreateUser())
      const user = await userCollection.findOne({ _id: createUser.insertedId })

      expect(user.accessToken).toBeFalsy()

      const userId = MongoHelper.map(user).id
      await sut.updateAccessToken(userId, 'token')
      const expectedResponse = await userCollection.findOne({ _id: userId })

      expect(expectedResponse.accessToken).toBeTruthy()
      expect(expectedResponse.accessToken).toEqual('token')
    })
  })

  describe('LoadByToken', () => {
    it('Should return null if loadByToken method is fail', async () => {
      const sut = makeSut()
      const expectedResponse = await sut.loadByToken('accessToken', 'admin')
      expect(expectedResponse).toBeNull()
    })

    it('Should return correct an user on succeeds if loadByToken method without role property', async () => {
      const sut = makeSut()
      await userCollection.insertOne(Object.assign({
        ...fixturesCreateUser(),
        accessToken: 'accessToken'
      }))
      const expectedResponse = await sut.loadByToken('accessToken')
      expect(expectedResponse).toBeTruthy()
      expect(expectedResponse.id).toBeTruthy()
    })

    it('Should return correct an user on succeeds if loadByToken method with role property', async () => {
      const sut = makeSut()
      await userCollection.insertOne(Object.assign({
        ...fixturesCreateUser(),
        accessToken: 'accessToken',
        role: 'admin'
      }))
      const expectedResponse = await sut.loadByToken('accessToken', 'admin')
      expect(expectedResponse).toBeTruthy()
      expect(expectedResponse.id).toBeTruthy()
    })
  })

  describe('updateConfirmUser', () => {
    it('Should update confirmUser and updateAt field correctly', async () => {
      const sut = makeSut()
      const createUser = await userCollection.insertOne(Object.assign({
        ...fixturesCreateUser(),
        accessToken: 'accessToken'
      }))

      const user = await userCollection.findOne({ _id: createUser.insertedId })
      const userId = MongoHelper.map(user).id
      await sut.updateConfirmUser({
        confirmUser: true,
        userId
      })

      const expectedResponse = await userCollection.findOne({ _id: userId })
      expect(expectedResponse.confirmUser).toBeTruthy()
      expect(expectedResponse.updatedAt).toEqual(new Date())
    })
  })

  describe('update', () => {
    it('Should update user all field correctly', async () => {
      const sut = makeSut()
      const createUser = await userCollection.insertOne(Object.assign({
        ...fixturesCreateUser(),
        createdAt: new Date(),
        updatedAt: new Date(),
        accessToken: 'accessToken'
      }))

      const user = await userCollection.findOne({ _id: createUser.insertedId })
      const userId = MongoHelper.map(user).id
      const expectedResponse = await sut.update(
        Object.assign({ ...fixturesUpdateUser(), userId })
      )

      expect(expectedResponse).toEqual(Object.assign({ ...fixturesUpdateUserOutput(), id: userId }))
    })
  })
})
