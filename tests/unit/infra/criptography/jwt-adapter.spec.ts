import { JwtAdapter } from '@/infra/criptography/jwt-adapter'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return await new Promise(resolve => resolve('token'))
  }
}))

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('foo')
}

describe('JwtAdapter', () => {
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

  it('Should pass error if sign method throws exception error', async () => {
    const sut = makeSut()
    jest
      .spyOn(jwt, 'sign')
      .mockImplementationOnce(() => { throw new Error() })
    const expectedResponse = sut.encrypt('bar')
    await expect(expectedResponse).rejects.toThrow()
  })
})
