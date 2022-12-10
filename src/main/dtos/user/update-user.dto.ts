import { AddressDto } from '@/main/dtos/address/address.dto'

export interface UpdateUserDto {
  userId?: string
  name?: string
  birthDate: Date
  age?: number
  address?: AddressDto
  phone?: string[]
  type?: string
  document: string
  password?: string
  passwordConfirmation?: string
  updatedAt?: Date
}
