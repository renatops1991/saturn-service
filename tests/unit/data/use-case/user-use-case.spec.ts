import { Encrypted } from '../../../../src/data/protocols/encrypted'
import { UserUseCase } from '../../../../src/data/use-cases/user-use-case'
import { fixturesCreateUser } from '../../presentation/fixtures/fixtures-user'
import { mockEncrypted } from './mock/mock-user-use-case'

type SutType = {
  sut: UserUseCase
  encryptedStub: Encrypted
}

const makeSut = (): SutType => {
  const encryptedStub = mockEncrypted()
  const sut = new UserUseCase(encryptedStub)
  return {
    sut,
    encryptedStub
  }
}

describe('UserUseCase', () => {
  it('Should call Encrypted with correct password', async () => {
    const { sut, encryptedStub } = makeSut()
    const encryptSpy = jest.spyOn(encryptedStub, 'encrypt')
    const user = fixturesCreateUser()
    await sut.create(user)
    expect(encryptSpy).toHaveBeenCalledWith('12345')
  })
})
