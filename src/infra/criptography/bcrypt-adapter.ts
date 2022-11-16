import { IHashed } from '@/data/protocols/hashed'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements IHashed {
  constructor (private readonly salt: number) {}

  async hash (value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt)
  }

  async compare (value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash)
  }
}
