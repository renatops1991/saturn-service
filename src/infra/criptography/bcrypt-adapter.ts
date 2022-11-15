import { ICryptography } from '@/data/protocols/cryptography'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements ICryptography {
  constructor (private readonly salt: number) {}

  async encrypt (input: string): Promise<string> {
    const cryptographyValue = await bcrypt.hash(input, this.salt)
    return cryptographyValue
  }

  compare: (value: string, hash: string) => Promise<boolean>
}
