import { AddressDto } from '@/main/dtos/address/address.dto'

export interface UpdateUserOutputDto {
  id: string
  name: string
  birthDate: Date
  age: number
  address: AddressDto
  phone: string[]
  type: string
  document: string
}
