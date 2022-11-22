import {
  CreateUserDto,
  LoadUserDto,
  UserOutputDto,
  SignInUserOutputDto,
  SignInUserDto
} from '@/presentation/dtos/user/'

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

export const fixturesCreateUserOutput = (): UserOutputDto => ({
  id: 'foo',
  name: 'John Foo Bar',
  email: 'foo@example.com'
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

export const fixturesLoginUser = (): SignInUserDto => {
  const loginUserDto: SignInUserDto = {
    email: 'foo@example.com',
    password: '12345'
  }
  return loginUserDto
}

export const fixturesLoginUserOutput = (): SignInUserOutputDto => {
  const loginUserOutputDto: SignInUserOutputDto = {
    name: 'John Foo Bar',
    email: 'foo@example.com',
    accessToken: 'accessToken'
  }
  return loginUserOutputDto
}

export const fixturesLoadUser = (): LoadUserDto => {
  const loadUserDto: LoadUserDto = {
    id: 'foo',
    name: 'John Foo Bar',
    email: 'foo@example.com',
    password: 'hashed'
  }
  return loadUserDto
}
