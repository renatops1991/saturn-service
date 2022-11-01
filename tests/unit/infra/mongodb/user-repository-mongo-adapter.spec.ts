import { MongoHelper } from '@/infra/mongodb/mongo-helper'
import { UserRepositoryMongoAdapter } from '@/infra/mongodb/user-repository-mongo-adapter'
import { fixturesCreateUser } from '@/tests/unit/presentation/fixtures/fixtures-user'

type SutTypes = {
  sut: UserRepositoryMongoAdapter
}
const makeSut = (): SutTypes => {
  const sut = new UserRepositoryMongoAdapter()
  return {
    sut
  }
}
describe('UserRepositoryMongoAdapter', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGODB_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const userCollection = MongoHelper.getCollection('users')
    await userCollection.deleteMany({})
  })

  it('Should return correct an user on success', async () => {
    const { sut } = makeSut()
    const expectedResponse = await sut.create(fixturesCreateUser())
    expect(expectedResponse).toBeTruthy()
    expect(expectedResponse.id).toBeTruthy()
    expect(expectedResponse.name).toEqual(fixturesCreateUser().name)
    expect(expectedResponse.email).toEqual(fixturesCreateUser().email)
    expect(expectedResponse.password).toEqual(fixturesCreateUser().password)
  })
})
