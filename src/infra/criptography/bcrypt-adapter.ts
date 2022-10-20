import { IEncrypted } from '@/data/protocols/encrypted'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements IEncrypted {
  constructor (private readonly salt: number) {}

  async encrypt (input: string): Promise<string> {
    const encryptedValue = await bcrypt.hash(input, this.salt)
    return encryptedValue
  }
}
