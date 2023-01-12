import { MongoHelper } from '@/infra/mongodb/mongo-helper'
import { UserRepositoryMongoAdapter } from '@/infra/mongodb/user-repository-mongo-adapter'
import {
  fixtureCreateUser,
  fixtureFullUser,
  fixtureUpdateUser, fixtureUpdateUserOutput
} from '@/tests/unit/presentation/fixtures/fixtures-user'
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
      const expectedResponse = await sut.create(fixtureCreateUser())
      expect(expectedResponse).toBeTruthy()
      expect(expectedResponse.name).toEqual(fixtureCreateUser().name)
      expect(expectedResponse.email).toEqual(fixtureCreateUser().email)
    })
  })

  describe('LoadByEmail', () => {
    it('Should return correct an user if loadByEmail method on succeeds', async () => {
      const sut = makeSut()
      await userCollection.insertOne(fixtureCreateUser())
      const expectedUser = await sut.loadByEmail('foo@example.com')
      expect(expectedUser).toBeTruthy()
      expect(expectedUser.id).toBeTruthy()
      expect(expectedUser.name).toEqual(fixtureCreateUser().name)
      expect(expectedUser.email).toEqual(fixtureCreateUser().email)
      expect(expectedUser.password).toEqual(fixtureCreateUser().password)
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
      const createUser = await userCollection.insertOne(fixtureCreateUser())
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
        ...fixtureCreateUser(),
        accessToken: 'accessToken'
      }))
      const expectedResponse = await sut.loadByToken('accessToken')
      expect(expectedResponse).toBeTruthy()
      expect(expectedResponse.id).toBeTruthy()
    })

    it('Should return correct an user on succeeds if loadByToken method with role property', async () => {
      const sut = makeSut()
      await userCollection.insertOne(Object.assign({
        ...fixtureCreateUser(),
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
        ...fixtureCreateUser(),
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
        ...fixtureCreateUser(),
        createdAt: new Date(),
        updatedAt: new Date(),
        accessToken: 'accessToken'
      }))

      const user = await userCollection.findOne({ _id: createUser.insertedId })
      const userId = MongoHelper.map(user).id
      const expectedResponse = await sut.update(
        Object.assign(
          {
            ...fixtureUpdateUser(),
            userId,
            updatedAt: new Date()
          })
      )

      expect(expectedResponse).toEqual(Object.assign({ ...fixtureUpdateUserOutput(), id: userId }))
    })

    it('Should update user without optional fields correctly', async () => {
      const sut = makeSut()
      const createUser = await userCollection.insertOne(Object.assign({
        ...fixtureCreateUser(),
        createdAt: new Date(),
        updatedAt: new Date(),
        accessToken: 'accessToken'
      }))

      const user = await userCollection.findOne({ _id: createUser.insertedId })
      const userId = MongoHelper.map(user).id
      const expectedResponse = await sut.update(
        Object.assign({
          userId,
          birthDate: new Date('1992-08-01'),
          document: '4564564564545',
          updatedAt: new Date()
        })
      )

      expect(expectedResponse).toEqual(Object.assign(
        {
          id: userId,
          name: 'John Foo Bar',
          birthDate: new Date('1992-08-01'),
          document: '4564564564545',
          updatedAt: new Date(),
          createdAt: new Date()
        }))
    })
  })

  describe('updateUserPassword', () => {
    it('Should update user password and updateAt field correctly', async () => {
      const sut = makeSut()
      const createUser = await userCollection.insertOne(Object.assign({
        ...fixtureCreateUser(),
        accessToken: 'accessToken'
      }))

      const user = await userCollection.findOne({ _id: createUser.insertedId })
      const userId = MongoHelper.map(user).id
      await sut.updateUserPassword({
        password: 'bar',
        userId
      })

      const expectedResponse = await userCollection.findOne({ _id: userId })
      expect(expectedResponse.password).toEqual('bar')
      expect(expectedResponse.updatedAt).toEqual(new Date())
    })
  })

  describe('getUser', () => {
    it('Should return an user with correct data', async () => {
      const sut = makeSut()
      const createUser = await userCollection.insertOne(Object.assign({
        ...fixtureCreateUser(),
        accessToken: 'accessToken',
        createdAt: new Date(),
        updatedAt: new Date()
      }))

      const user = await userCollection.findOne({ _id: createUser.insertedId })
      const userId = MongoHelper.map(user).id

      const expectedResponse = await sut.getUser(userId)
      expect(expectedResponse).toEqual({
        id: userId,
        name: 'John Foo Bar',
        email: 'foo@example.com',
        confirmUser: false,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    })
  })

  describe('getAllUsers', () => {
    const sut = makeSut()
    const firstUser = fixtureFullUser()
    const secondUser = Object.assign({ ...fixtureFullUser(), email: 'bar@gmail.com' })
    const thirstUser = Object.assign({ ...fixtureFullUser(), createdAt: new Date('2023-01-09') })

    const insertUsers = async (): Promise<any> => {
      return (await userCollection.insertMany([firstUser, secondUser, thirstUser])).insertedIds
    }

    const users = async (id: number): Promise<any> => {
      const user = await userCollection.findOne({ _id: id }, { projection: { password: 0 } })
      return MongoHelper.map(user)
    }

    it('Should return users correctly with createdAt greater than date that was provided', async () => {
      const insertUser = await insertUsers()
      const firstUserOutput = await users(insertUser[0])
      const secondUserOutput = await users(insertUser[1])
      const expectedResponse = await sut.getAllUsers({ startDate: '2023-01-10' })
      expect(expectedResponse).toEqual([firstUserOutput, secondUserOutput])
    })

    it('Should return users correctly with createdAt less than date that was provided', async () => {
      const insertUser = await insertUsers()
      const thirstUserOutput = await users(insertUser[2])
      const expectedResponse = await sut.getAllUsers({ endDate: '2023-01-10' })
      expect(expectedResponse).toEqual([thirstUserOutput])
    })

    it('Should return users correctly with the email that was provided', async () => {
      const insertUser = await insertUsers()
      const secondUserOutput = await users(insertUser[1])
      const expectedResponse = await sut.getAllUsers({ email: 'bar@gmail.com' })
      expect(expectedResponse).toEqual([secondUserOutput])
    })

    it('Should return users correctly with all filters that was provided', async () => {
      const insertUser = await insertUsers()
      const firstUserOutput = await users(insertUser[0])
      const secondUserOutput = await users(insertUser[1])
      const thirstUserOutput = await users(insertUser[2])

      const expectedResponse = await sut.getAllUsers({
        email: 'foo@gmail.com',
        document: '000000000000',
        startDate: '2023-01-10',
        endDate: '2023-01-11'
      })
      expect(expectedResponse).toEqual(
        [
          firstUserOutput,
          secondUserOutput,
          thirstUserOutput
        ]
      )
    })

    it('Should return all users correctly if filters is not provided', async () => {
      const insertUser = await insertUsers()
      const firstUserOutput = await users(insertUser[0])
      const secondUserOutput = await users(insertUser[1])
      const thirstUserOutput = await users(insertUser[2])

      const expectedResponse = await sut.getAllUsers({})
      expect(expectedResponse).toEqual(
        [
          firstUserOutput,
          secondUserOutput,
          thirstUserOutput
        ]
      )
    })
  })
})
