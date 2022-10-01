import { AddressDto } from './address.dto'

export interface UserDto {
  name: string
  birthDate?: Date
  age?: number
  email: string
  address?: AddressDto
  phone?: string[]
  type?: string
  document?: string
  password?: string
  passwordConfirmation: string
  confirmUser?: boolean
}
