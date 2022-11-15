
import { IEncrypted } from '@/data/protocols/encrypted'
import { IUserRepository } from '@/data/protocols/user-repository'
import { User } from '@/data/use-cases/user'
import { fixturesCreateUser, fixturesCreateUserOutput, fixturesLoginUser } from '@/tests/unit/presentation/fixtures/fixtures-user'
import { mockEncrypted, mockUserRepository } from './mock/mock-user-use-case'

type SutType = {
  sut: User
  encryptedStub: IEncrypted
  userRepositoryStub: IUserRepository
}

const makeSut = (): SutType => {
  const encryptedStub = mockEncrypted()
  const userRepositoryStub = mockUserRepository()
  const sut = new User(encryptedStub, userRepositoryStub)
  return {
    sut,
    encryptedStub,
    userRepositoryStub
  }
}

describe('User use case', () => {
  describe('Create', () => {
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

  describe('Authentication', () => {
    it('Should call loadByEmail method of the UserRepository class with correct values', async () => {
      const { sut, userRepositoryStub } = makeSut()
      const user = fixturesLoginUser()
      const loadByEmailSpy = jest.spyOn(userRepositoryStub, 'loadByEmail')
      await sut.auth(user)
      expect(loadByEmailSpy).toHaveBeenCalledWith(user.email)
    })

    it('Should forward the error if loadByEmail method of the UserRepository class throws error', async () => {
      const { sut, userRepositoryStub } = makeSut()
      const user = fixturesCreateUser()
      jest
        .spyOn(userRepositoryStub, 'loadByEmail')
        .mockRejectedValueOnce(new Error())
      const expectedResponse = sut.auth(user)
      await expect(expectedResponse).rejects.toThrow()
    })
  })
})
