
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter'
import bcrypt from 'bcrypt'

type SutType = {
  sut: BcryptAdapter
}

const salt = 12

const makeSut = (): SutType => {
  const sut = new BcryptAdapter(salt)
  return {
    sut
  }
}

describe('BcryptAdapter', () => {
  it('Should call bcrypt with correct value', async () => {
    const { sut } = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('hashPassword')
    expect(hashSpy).toHaveBeenCalledWith('hashPassword', salt)
  })
})
