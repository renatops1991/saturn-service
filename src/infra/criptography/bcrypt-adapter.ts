import { ICryptography } from '@/data/protocols/cryptography'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements ICryptography {
  constructor (private readonly salt: number) {}

  async hash (value: string): Promise<string> {
    const cryptographyValue = await bcrypt.hash(value, this.salt)
    return cryptographyValue
  }

  encrypt: (userId: string) => Promise<string>
  compare: (value: string, hash: string) => Promise<boolean>
}
