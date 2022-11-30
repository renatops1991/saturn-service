
import { AddressDto } from '@/main/dtos/address/address.dto'
import {
  SignUpUserDto,
  LoadUserDto,
  UserOutputDto,
  SignInUserDto,
  UpdateConfirmUserDto
} from '@/main/dtos/user'
import { UpdateUserOutputDto } from '@/main/dtos/user/update-user-output.dto'
import { UpdateUserDto } from '@/main/dtos/user/update-user.dto'

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

export const fixturesUpdateUser = (): UpdateUserDto => ({
  userId: 'foo',
  name: 'John Foo Bar',
  birthDate: new Date('1991-08-01'),
  age: 31,
  address: fixturesAddress(),
  phone: ['11554678952'],
  type: 'PERSON',
  document: '000000000000',
  password: '12345',
  passwordConfirmation: '12345'
})

const fixturesAddress = (): AddressDto => ({
  street: 'foo',
  number: 'A1',
  neighborhood: 'bar',
  complements: 'xis',
  city: 'foo',
  state: 'SP'
})

export const fixturesUpdateUserOutput = (): UpdateUserOutputDto => ({
  id: 'foo',
  name: 'John Foo Bar',
  birthDate: new Date('1991-08-01'),
  age: 31,
  address: fixturesAddress(),
  phone: ['11554678952'],
  type: 'PERSON',
  document: '000000000000'
})
