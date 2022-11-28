
import {
  SignUpUserDto,
  LoadUserDto,
  UserOutputDto,
  SignInUserDto,
  UpdateConfirmUserDto
} from '@/main/dtos/user'

export const fixturesCreateUserRequest = (): SignUpUserDto => ({
  name: 'John Foo Bar',
  email: 'foo@example.com',
  password: '12345',
  passwordConfirmation: '12345',
  confirmUser: false
})

export const fixturesCreateUser = (): Omit<SignUpUserDto, 'passwordConfirmation'> => ({
  name: 'John Foo Bar',
  email: 'foo@example.com',
  password: '12345',
  confirmUser: false
})

export const fixturesLoginUser = (): SignInUserDto => ({
  email: 'foo@example.com',
  password: '12345'
})

export const fixturesUserOutput = (): UserOutputDto => ({
  name: 'John Foo Bar',
  email: 'foo@example.com',
  accessToken: 'accessToken'
})

export const fixturesLoadUser = (): LoadUserDto => ({
  id: 'foo',
  name: 'John Foo Bar',
  email: 'foo@example.com',
  password: 'hashed'
})

export const fixturesUpdateConfirmUser = (): UpdateConfirmUserDto => ({
  confirmUser: true,
  userId: 'foo'
})
