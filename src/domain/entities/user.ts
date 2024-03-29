import type { UserType } from '@/data/types'
import type { UserBasicInfoType } from '@/data/types/user-basic-info-type'
import type { Address } from './address'
import * as utils from '@/main/utils'

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

  public getUser (): UserType {
    const user = {
      userId: this.id,
      name: this.name,
      birthDate: this.birthDate,
      age: this.age,
      address: this.address,
      phone: this.phone,
      type: this.type,
      document: this.document,
      password: this.password,
      updatedAt: this.updatedAt
    }

    return utils.getFieldsWithValidValues(user) as UserType
  }
}
