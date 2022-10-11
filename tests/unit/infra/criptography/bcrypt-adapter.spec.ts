
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
  }
}))

describe('BcryptAdapter', () => {
  it('Should call bcrypt with correct value', async () => {
    const { sut } = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('password')
    expect(hashSpy).toHaveBeenCalledWith('password', salt)
  })

  it('Should return a correct has on success', async () => {
    const { sut } = makeSut()
    const expectedResponse = await sut.encrypt('password')
    expect(expectedResponse).toEqual('hashPassword')
  })
})
