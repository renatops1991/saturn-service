import { JwtAdapter } from '@/infra/cryptography/jwt-adapter'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return await new Promise(resolve => { resolve('token') })
  },
  async verify (): Promise<string> {
    return await new Promise(resolve => { resolve('token') })
  }
}))

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('foo')
}

describe('JwtAdapter', () => {
  describe('encrypt', () => {
    it('Should call sign method with correct value', async () => {
      const sut = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt('bar')
      expect(signSpy).toHaveBeenLastCalledWith({ id: 'bar' }, 'foo')
    })

    it('Should return a token if sign method on succeeds', async () => {
      const sut = makeSut()
      const expectedResponse = await sut.encrypt('bar')
      expect(expectedResponse).toBe('token')
    })

    it('Should forward error if sign method throws exception error', async () => {
      const sut = makeSut()
      jest
        .spyOn(jwt, 'sign')
        .mockImplementationOnce(() => { throw new Error() })
      const expectedResponse = sut.encrypt('bar')
      await expect(expectedResponse).rejects.toThrow()
    })
  })

  describe('decrypt', () => {
    it('Should call verify method of the JWT with correct value', async () => {
      const sut = makeSut()
      const verifySpy = jest
        .spyOn(jwt, 'verify')
      await sut.decrypt('accessToken')
      expect(verifySpy).toHaveBeenCalledWith('accessToken', 'foo')
    })

    it('Should return a value if verify method on succeeds', async () => {
      const sut = makeSut()
      jest
        .spyOn(jwt, 'verify')
      const expectedResponse = await sut.decrypt('accessToken')
      expect(expectedResponse).toEqual('token')
    })

    it('Should forward the error if verify method throws exception error', async () => {
      const sut = makeSut()
      jest
        .spyOn(jwt, 'verify')
        .mockImplementationOnce(() => { throw new Error() })
      const expectedResponse = sut.decrypt('accessToken')
      await expect(expectedResponse).rejects.toThrow()
    })
  })
})
