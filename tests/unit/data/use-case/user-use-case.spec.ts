import { UserBuilder } from '@/data/builders/user-builder'
import { Encrypted } from '@/data/protocols/encrypted'
import { UserRepository } from '@/data/protocols/user-repository'
import { UserUseCase } from '@/data/use-cases/user-use-case'
import { fixturesCreateUser, fixturesCreateUserOutput } from '../../presentation/fixtures/fixtures-user'
import { mockEncrypted, mockUserBuilder, mockUserRepository } from './mock/mock-user-use-case'

type SutType = {
  sut: UserUseCase
  encryptedStub: Encrypted
  userRepositoryStub: UserRepository
  userBuilderStub: UserBuilder
}

const makeSut = (): SutType => {
  const encryptedStub = mockEncrypted()
  const userRepositoryStub = mockUserRepository()
  const userBuilderStub = mockUserBuilder()
  const sut = new UserUseCase(encryptedStub, userRepositoryStub, userBuilderStub)
  return {
    sut,
    encryptedStub,
    userRepositoryStub,
    userBuilderStub
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

  it('Should return an user on success', async () => {
    const { sut } = makeSut()
    const user = fixturesCreateUser()
    const expectedResponse = await sut.create(user)
    expect(expectedResponse).toEqual(fixturesCreateUserOutput())
  })

  it('Should call UserBuilder with correct password', async () => {
    const { sut, userBuilderStub } = makeSut()
    const buildUserSpy = jest.spyOn(userBuilderStub, 'buildUserBasicInfo')
    const user = fixturesCreateUser()
    await sut.create(user)
    expect(buildUserSpy).toHaveBeenCalledWith(fixturesCreateUser())
  })
})
