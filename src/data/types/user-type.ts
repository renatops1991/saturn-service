import type { Address } from '@/domain/entities/address'

export type UserType = {
  userId: string
  name: string
  birthDate: Date
  age: number
  address: Address
  phone: string[]
  type: string
  document: string
  password?: string
  updatedAt: Date
}
