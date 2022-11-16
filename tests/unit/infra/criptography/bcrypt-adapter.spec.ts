
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter'
import bcrypt from 'bcrypt'

const salt = 12
type SutType = {
  sut: BcryptAdapter
}

const makeSut = (): SutType => {
  const sut = new BcryptAdapter(salt)
  return {
    sut
  }
}

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => resolve('hashPassword'))
  },

  async compare (): Promise<boolean> {
    return await new Promise(resolve => resolve(true))
  }
}))

describe('BcryptAdapter', () => {
  describe('hash', () => {
    it('Should call hash method with correct value', async () => {
      const { sut } = makeSut()
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.hash('password')
      expect(hashSpy).toHaveBeenCalledWith('password', salt)
    })

    it('Should return a correct hash on success', async () => {
      const { sut } = makeSut()
      const expectedResponse = await sut.hash('password')
      expect(expectedResponse).toEqual('hashPassword')
    })

    it('Should pass error if hash method throws exception error', async () => {
      const { sut } = makeSut()
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => { throw new Error() })
      const expectedResponse = sut.hash('password')
      await expect(expectedResponse).rejects.toThrow()
    })
  })

  describe('compare', () => {
    it('Should call compare method with correct value', async () => {
      const { sut } = makeSut()
      const compareSpy = jest.spyOn(bcrypt, 'compare')
      await sut.compare('password', 'hashPassword')
      expect(compareSpy).toHaveBeenCalledWith('password', 'hashPassword')
    })
  })
})
