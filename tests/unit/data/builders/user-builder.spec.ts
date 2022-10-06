import { UserBuilder } from '../../../../src/data/builders/user-builder'
import { fixturesCreateUser } from '../../presentation/fixtures/fixtures-user'

describe('UserBuilder', () => {
  it('Should build user with correct', async () => {
    const sut = new UserBuilder()
    const expectedResponse = sut.buildUserBasicInfo(fixturesCreateUser())
    expect(expectedResponse).toEqual(fixturesCreateUser())
  })
})
