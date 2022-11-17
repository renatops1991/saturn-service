import { JwtAdapter } from '@/infra/criptography/jwt-adapter'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return await new Promise(resolve => resolve('token'))
  }
}))

describe('JwtAdapter', () => {
  it('Should call sign method with correct value', async () => {
    const sut = new JwtAdapter('foo')
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('bar')
    expect(signSpy).toHaveBeenLastCalledWith({ id: 'bar' }, 'foo')
  })

  it('Should return a token if sign method on succeeds', async () => {
    const sut = new JwtAdapter('foo')
    const expectedResponse = await sut.encrypt('bar')
    expect(expectedResponse).toBe('token')
  })
})
