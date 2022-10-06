import { Encrypted } from '../../../../../src/data/protocols/encrypted'

export const mockEncrypted = (): Encrypted => {
  class EncryptedStub {
    async encrypt (input: string): Promise<string> {
      return await new Promise(resolve => resolve('hashedPassword'))
    }
  }
  return new EncryptedStub()
}
