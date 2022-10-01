import { UserDto } from '../../../../src/presentation/dtos/user.dto'

export const fixturesCreateUser = (): UserDto => {
  const userDto: UserDto = {
    name: 'John Foo Bar',
    email: 'foo@example.com',
    password: '12345',
    passwordConfirmation: '12345'

  }
  return userDto
}
