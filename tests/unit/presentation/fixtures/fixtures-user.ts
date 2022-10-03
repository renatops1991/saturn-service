import { CreateUserDto } from '../../../../src/presentation/dtos/user/createUser.dto'

export const fixturesCreateUser = (): CreateUserDto => {
  const userDto: CreateUserDto = {
    name: 'John Foo Bar',
    email: 'foo@example.com',
    password: '12345',
    passwordConfirmation: '12345'

  }
  return userDto
}
