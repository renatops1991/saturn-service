import { AddressType } from './address-type'

export type UserType = {
  name: string
  birthDate: Date
  age: number
  address: AddressType
  phone: string[]
  type: string
  document: string
  password?: string
  updatedAt: Date
}
