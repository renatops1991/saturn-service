import { UserBuilder } from '@/domain/builders/user-builder'
import { fixturesCreateUser } from '@/tests/unit/presentation/fixtures/fixtures-user'

describe('UserBuilder', () => {
  it('Should build user with correct', async () => {
    const sut = new UserBuilder()
    const expectedResponse = sut.buildUserBasicInfo(fixturesCreateUser())
    expect(expectedResponse).toEqual({
      name: 'John Foo Bar',
      email: 'foo@example.com',
      password: '12345',
      confirmUser: false
    })
  })
})
