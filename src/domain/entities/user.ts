import { UserBasicInfoType } from '@/data/types/user-basic-info-type'
import { Address } from './address'

export class User {
  id: string
  name: string
  birthDate?: Date
  age?: number
  email: string
  address?: Address
  phone?: string[]
  type?: string
  document?: string
  password: string
  confirmUser?: boolean
  createdAt: Date
  updatedAt: Date

  public getUserBasicInfo (): UserBasicInfoType {
    return {
      name: this.name,
      email: this.email,
      password: this.password,
      confirmUser: this.confirmUser,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
