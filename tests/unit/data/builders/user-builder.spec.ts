import { UserBuilder } from '@/data/builders/user-builder'
import { fixturesCreateUser } from '@/tests/unit/presentation/fixtures/fixtures-user'
import MockDate from 'mockdate'

describe('UserBuilder', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  it('Should build user with corrects values', async () => {
    const sut = new UserBuilder()
    const expectedResponse = sut.buildUserBasicInfo(fixturesCreateUser())
    expect(expectedResponse).toEqual({
      name: 'John Foo Bar',
      email: 'foo@example.com',
      password: '12345',
      confirmUser: false,
      createdAt: new Date(),
      updatedAt: new Date()
    })
  })

  it('Should build user with confirmUser field equal false if not provided', async () => {
    const sut = new UserBuilder()
    const buildUser = fixturesCreateUser()
    delete buildUser.confirmUser
    const expectedResponse = sut.buildUserBasicInfo(buildUser)
    expect(expectedResponse).toEqual({
      name: 'John Foo Bar',
      email: 'foo@example.com',
      password: '12345',
      confirmUser: false,
      createdAt: new Date(),
      updatedAt: new Date()
    })
  })
})
