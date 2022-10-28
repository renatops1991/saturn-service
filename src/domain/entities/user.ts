import { UserBasicInfo } from '@/domain/types/user-basic-info'
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

  public getUserBasicInfo (): UserBasicInfo {
    return {
      name: this.name,
      email: this.email,
      password: this.password,
      confirmUser: this.confirmUser
    }
  }
}
