import { Encrypted } from '../../../../src/data/protocols/encrypted'
import { UserRepository } from '../../../../src/data/protocols/user-repository'
import { UserUseCase } from '../../../../src/data/use-cases/user-use-case'
import { fixturesCreateUser } from '../../presentation/fixtures/fixtures-user'
import { mockEncrypted, mockUserRepository } from './mock/mock-user-use-case'

type SutType = {
  sut: UserUseCase
  encryptedStub: Encrypted
  userRepositoryStub: UserRepository
}

const makeSut = (): SutType => {
  const encryptedStub = mockEncrypted()
  const userRepositoryStub = mockUserRepository()
  const sut = new UserUseCase(encryptedStub, userRepositoryStub)
  return {
    sut,
    encryptedStub,
    userRepositoryStub
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

  it('Should forward the error if Encrypted throws error', async () => {
    const { sut, encryptedStub } = makeSut()
    jest.spyOn(encryptedStub, 'encrypt').mockRejectedValueOnce(new Error())
    const user = fixturesCreateUser()
    const expectedResponse = sut.create(user)
    await expect(expectedResponse).rejects.toThrow()
  })

  it('Should forward the error if Encrypted throws error', async () => {
    const { sut, userRepositoryStub } = makeSut()
    const createSpy = jest.spyOn(userRepositoryStub, 'create')
    const user = fixturesCreateUser()
    const expectedResponse = Object.assign({
      ...fixturesCreateUser(),
      password: 'hashedPassword'
    })
    await sut.create(user)
    expect(createSpy).toHaveBeenCalledWith(expectedResponse)
  })

  it('Should forward the error if UserRepository throws error', async () => {
    const { sut, userRepositoryStub } = makeSut()
    jest.spyOn(userRepositoryStub, 'create').mockRejectedValueOnce(new Error())
    const user = fixturesCreateUser()
    const expectedResponse = sut.create(user)
    await expect(expectedResponse).rejects.toThrow()
  })
})
