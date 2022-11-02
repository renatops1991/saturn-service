import { CreateUserOutputDto } from '@/presentation/dtos/user/create-user-output.dto'
import { CreateUserDto } from '@/presentation/dtos/user/create-user.dto'
import { LoginUserOutputDto } from '@/presentation/dtos/user/login-user-output.dto'
import { LoginUserDto } from '@/presentation/dtos/user/login-user.dto'

export const fixturesCreateUserRequest = (): CreateUserDto => {
  const userDto: CreateUserDto = {
    name: 'John Foo Bar',
    email: 'foo@example.com',
    password: '12345',
    passwordConfirmation: '12345',
    confirmUser: false
  }
  return userDto
}

export const fixturesCreateUserOutput = (): CreateUserOutputDto => ({
  id: 'foo',
  name: 'John Foo Bar',
  email: 'foo@example.com',
  password: 'hashedPassword'
})

export const fixturesCreateUser = (): Omit<CreateUserDto, 'passwordConfirmation'> => {
  const userDto: Omit<CreateUserDto, 'passwordConfirmation'> = {
    name: 'John Foo Bar',
    email: 'foo@example.com',
    password: '12345',
    confirmUser: false
  }
  return userDto
}

export const fixturesLoginUser = (): LoginUserDto => {
  const loginUserDto: LoginUserDto = {
    email: 'foo@example.com',
    password: '12345'
  }
  return loginUserDto
}

export const fixturesLoginUserOutput = (): LoginUserOutputDto => {
  const loginUserOutputDto: LoginUserOutputDto = {
    name: 'John Foo Bar',
    email: 'foo@example.com',
    accessToken: 'accessToken'
  }
  return loginUserOutputDto
}
