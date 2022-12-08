import { UserBuilder } from '@/data/builders/user-builder'
import { Address } from '@/domain/entities/address'
import { fixturesCreateUser, fixturesUpdateUser } from '@/tests/unit/presentation/fixtures/fixtures-user'
import MockDate from 'mockdate'

describe('UserBuilder', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  describe('buildUserBasicInfo', () => {
    it('Should build user basic info with corrects values', async () => {
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

    it('Should build user basic info with confirmUser field equal false if not provided', async () => {
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

  describe('buildUser', () => {
    it('Should build user with corrects values', async () => {
      const sut = new UserBuilder()
      const expectedResponse = sut.buildUser(fixturesUpdateUser())
      expect(expectedResponse).toEqual({
        name: 'John Foo Bar',
        birthDate: new Date('1991-08-01'),
        age: 31,
        address: Object.assign(new Address(), {
          street: 'foo',
          number: 'A1',
          neighborhood: 'bar',
          complements: 'xis',
          city: 'foo',
          state: 'SP'
        }),
        phone: ['11554678952'],
        type: 'PERSON',
        password: '12345',
        document: '000000000000',
        updatedAt: new Date()
      })
    })

    it('Should build user with optionals fields', async () => {
      const sut = new UserBuilder()
      const expectedResponse = sut.buildUser({
        userId: 'foo',
        birthDate: new Date('1991-08-01'),
        document: '000000000000'
      })
      expect(expectedResponse).toEqual({
        birthDate: new Date('1991-08-01'),
        document: '000000000000',
        updatedAt: new Date()
      })
    })
  })
})
