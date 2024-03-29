import type { ICryptography } from '@/data/protocols/cryptography'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements ICryptography {
  constructor (private readonly secret: string) {}

  async encrypt (userId: string): Promise<string> {
    return jwt.sign({ id: userId }, this.secret)
  }

  async decrypt (token: string): Promise<string> {
    return jwt.verify(token, this.secret) as string
  }
}
