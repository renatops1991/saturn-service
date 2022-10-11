import { Encrypted } from '@/data/protocols/encrypted'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Encrypted {
  constructor (private readonly salt: number) {}

  async encrypt (input: string): Promise<string> {
    await bcrypt.hash(input, this.salt)
    return null
  }
}
