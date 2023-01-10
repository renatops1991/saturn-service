
import { AddressDto } from '@/main/dtos/address/address.dto'
import {
  SignUpUserDto,
  LoadUserDto,
  UserOutputDto,
  SignInUserDto,
  UpdateConfirmUserDto,
  UpdateUserPasswordDto,
  GetUserDto
} from '@/main/dtos/user'
import { UpdateUserOutputDto } from '@/main/dtos/user/update-user-output.dto'
import { UpdateUserDto } from '@/main/dtos/user/update-user.dto'

export const fixtureCreateUserRequest = (): SignUpUserDto => ({
  name: 'John Foo Bar',
  email: 'foo@example.com',
  password: '12345',
  passwordConfirmation: '12345',
  confirmUser: false
})

export const fixtureCreateUser = (): Omit<SignUpUserDto, 'passwordConfirmation'> => ({
  name: 'John Foo Bar',
  email: 'foo@example.com',
  password: '12345',
  confirmUser: false
})

export const fixtureLoginUser = (): SignInUserDto => ({
  email: 'foo@example.com',
  password: '12345'
})

export const fixtureUserOutput = (): UserOutputDto => ({
  name: 'John Foo Bar',
  email: 'foo@example.com',
  accessToken: 'accessToken'
})

export const fixtureLoadUser = (): LoadUserDto => ({
  id: 'foo',
  name: 'John Foo Bar',
  email: 'foo@example.com',
  password: 'hashed'
})

export const fixtureGetAllUsers = (): GetUserDto => ({
  userId: 'foo',
  email: 'foo@example.com',
  document: '000000000000',
  startDate: new Date(),
  endDate: new Date()
})

export const fixtureUpdateConfirmUser = (): UpdateConfirmUserDto => ({
  confirmUser: true,
  userId: 'foo'
})

export const fixtureUpdateUser = (): UpdateUserDto => ({
  userId: 'foo',
  name: 'John Foo Bar',
  birthDate: new Date('1991-08-01'),
  age: 31,
  address: fixtureAddress(),
  phone: ['11554678952'],
  type: 'PERSON',
  document: '000000000000',
  password: '12345',
  passwordConfirmation: '12345'
})

const fixtureAddress = (): AddressDto => ({
  street: 'foo',
  number: 'A1',
  neighborhood: 'bar',
  complements: 'xis',
  city: 'foo',
  state: 'SP'
})

export const fixtureUpdateUserOutput = (): UpdateUserOutputDto => ({
  id: 'foo',
  name: 'John Foo Bar',
  birthDate: new Date('1991-08-01'),
  age: 31,
  address: fixtureAddress(),
  phone: ['11554678952'],
  type: 'PERSON',
  document: '000000000000',
  createdAt: new Date(),
  updatedAt: new Date()
})

export const fixtureUpdateUserPassword = (): Omit<
UpdateUserPasswordDto, 'passwordConfirmation'> => ({
  userId: 'foo',
  password: '123'
})

export const fixtureUpdateUserPasswordRequest = (): UpdateUserPasswordDto => ({
  userId: 'foo',
  password: '123',
  passwordConfirmation: '123'
})
