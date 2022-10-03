import { CreateUserDto } from '../../../../src/presentation/dtos/user/create-user.dto'

export const fixturesCreateUser = (): CreateUserDto => {
  const userDto: CreateUserDto = {
    name: 'John Foo Bar',
    email: 'foo@example.com',
    password: '12345',
    passwordConfirmation: '12345',
    confirmUser: false
  }
  return userDto
}
