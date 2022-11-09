
import { IEncrypted } from '@/data/protocols/encrypted'
import { IUserRepository } from '@/data/protocols/user-repository'
import { UserBuilder } from '@/data/builders/user-builder'
import { User } from '@/data/use-cases/user'
import { fixturesCreateUser, fixturesCreateUserOutput } from '@/tests/unit/presentation/fixtures/fixtures-user'
import { mockEncrypted, mockUserBuilder, mockUserRepository } from './mock/mock-user-use-case'

type SutType = {
  sut: User
  encryptedStub: IEncrypted
  userRepositoryStub: IUserRepository
  userBuilderStub: UserBuilder
}

const makeSut = (): SutType => {
  const encryptedStub = mockEncrypted()
  const userRepositoryStub = mockUserRepository()
  const userBuilderStub = mockUserBuilder()
  const sut = new User(encryptedStub, userRepositoryStub)
  return {
    sut,
    encryptedStub,
    userRepositoryStub,
    userBuilderStub
  }
}

describe('User use case', () => {
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
})
