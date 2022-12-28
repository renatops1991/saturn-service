import { UserBuilder } from '@/data/builders/user-builder'
import { Address } from '@/domain/entities/address'
import { fixtureCreateUser, fixtureUpdateUser } from '@/tests/unit/presentation/fixtures/fixtures-user'
import { fixtureBuildUserBasicInfo } from '@/tests/unit/data/builders/fixtures/fixtures-user-builder'
import MockDate from 'mockdate'

const sut = new UserBuilder()

describe('UserBuilder', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  describe('buildUserBasicInfo', () => {
    it('Should build user basic info correctly', async () => {
      const expectedResponse = sut.buildUserBasicInfo(fixtureCreateUser())
      expect(expectedResponse).toEqual(
        Object.assign({}, {
          ...fixtureBuildUserBasicInfo(),
          password: '12345'
        }
        ))
    })

    it('Should build user basic info with field confirmUser equal to false if not provided', async () => {
      const buildUser = fixtureCreateUser()
      delete buildUser.confirmUser
      const expectedResponse = sut.buildUserBasicInfo(buildUser)
      expect(expectedResponse).toEqual(
        Object.assign({}, {
          ...fixtureBuildUserBasicInfo(),
          password: '12345'
        }
        ))
    })
  })

  describe('buildUser', () => {
    it('Should build user correctly', async () => {
      const expectedResponse = sut.buildUser(fixtureUpdateUser())
      expect(expectedResponse).toEqual({
        userId: 'foo',
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

    it('Should build user only with optionals fields', async () => {
      const expectedResponse = sut.buildUser({
        userId: 'foo',
        birthDate: new Date('1991-08-01'),
        document: '000000000000'
      })
      expect(expectedResponse).toEqual({
        userId: 'foo',
        birthDate: new Date('1991-08-01'),
        document: '000000000000',
        updatedAt: new Date()
      })
    })
  })
})
