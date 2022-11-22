
import { ICryptography } from '@/data/protocols/cryptography'
import { IHashed } from '@/data/protocols/hashed'
import { IUserRepository } from '@/data/protocols/user-repository'
import { User } from '@/data/use-cases/user'
import { fixturesCreateUser, fixturesCreateUserOutput, fixturesLoginUser } from '@/tests/unit/presentation/fixtures/fixtures-user'
import { mockCryptography, mockHashed, mockUserRepository } from './mock/mock-user-use-case'

type SutType = {
  sut: User
  hashedStub: IHashed
  cryptographyStub: ICryptography
  userRepositoryStub: IUserRepository
}

const makeSut = (): SutType => {
  const hashedStub = mockHashed()
  const cryptographyStub = mockCryptography()
  const userRepositoryStub = mockUserRepository()
  const sut = new User(hashedStub, cryptographyStub, userRepositoryStub)
  return {
    sut,
    hashedStub,
    cryptographyStub,
    userRepositoryStub
  }
}

describe('User use case', () => {
  describe('Create', () => {
    it('Should call Hashed with correct password', async () => {
      const { sut, hashedStub } = makeSut()
      const hashSpy = jest.spyOn(hashedStub, 'hash')
      const user = fixturesCreateUser()
      await sut.create(user)
      expect(hashSpy).toHaveBeenCalledWith('12345')
    })

    it('Should forward the error if Hashed throws error', async () => {
      const { sut, hashedStub } = makeSut()
      jest.spyOn(hashedStub, 'hash').mockRejectedValueOnce(new Error())
      const user = fixturesCreateUser()
      const expectedResponse = sut.create(user)
      await expect(expectedResponse).rejects.toThrow()
    })

    it('Should call Hashed with correct values', async () => {
      const { sut, userRepositoryStub } = makeSut()
      const createSpy = jest.spyOn(userRepositoryStub, 'create')
      const user = fixturesCreateUser()
      const expectedResponse = Object.assign({
        ...fixturesCreateUser(),
        password: 'hashed'
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

    it('Should return null if loadByEmail method returns null', async () => {
      const { sut, userRepositoryStub } = makeSut()
      const user = fixturesLoginUser()
      jest.spyOn(userRepositoryStub, 'loadByEmail').mockReturnValueOnce(null)
      const expectedRseponse = await sut.auth(user)
      expect(expectedRseponse).toBeNull()
    })

    it('Should call compare method with correct password', async () => {
      const { sut, hashedStub } = makeSut()
      const user = fixturesLoginUser()
      const hashCompareSpy = jest.spyOn(hashedStub, 'compare')
      await sut.auth(user)
      expect(hashCompareSpy).toHaveBeenCalledWith(user.password, 'hashed')
    })

    it('Should forward the error if compare method of the UserRepository class throws error', async () => {
      const { sut, hashedStub } = makeSut()
      const user = fixturesCreateUser()
      jest
        .spyOn(hashedStub, 'compare')
        .mockRejectedValueOnce(new Error())
      const expectedResponse = sut.auth(user)
      await expect(expectedResponse).rejects.toThrow()
    })

    it('Should return null if compare method returns false', async () => {
      const { sut, hashedStub } = makeSut()
      const user = fixturesLoginUser()
      jest
        .spyOn(hashedStub, 'compare')
        .mockReturnValueOnce(new Promise(resolve => resolve(false)))
      const expectedRseponse = await sut.auth(user)
      expect(expectedRseponse).toBeNull()
    })

    it('Should call Cryptography with correct id', async () => {
      const { sut, cryptographyStub } = makeSut()
      const user = fixturesLoginUser()
      const encryptSpy =
      jest
        .spyOn(cryptographyStub, 'encrypt')
      await sut.auth(user)
      expect(encryptSpy).toHaveBeenCalledWith('foo')
    })

    it('Should call updateAccessToken method of the UserRepository with correct values ', async () => {
      const { sut, userRepositoryStub } = makeSut()
      const updateAccessTokenSpy =
      jest
        .spyOn(userRepositoryStub, 'updateAccessToken')
      await sut.auth(fixturesLoginUser())
      expect(updateAccessTokenSpy).toHaveBeenCalledWith('foo', 'encrypted')
    })

    it('Should forward the error if updateAccessToken method of the UserRepository class throws error', async () => {
      const { sut, userRepositoryStub } = makeSut()
      jest
        .spyOn(userRepositoryStub, 'updateAccessToken')
        .mockRejectedValueOnce(new Error())
      const expectedResponse = sut.auth(fixturesCreateUser())
      await expect(expectedResponse).rejects.toThrow()
    })

    it('Should return name, email and accessToken if auth method on success', async () => {
      const { sut } = makeSut()
      const updateAccessTokenSpy =
      await sut.auth(fixturesLoginUser())
      expect(updateAccessTokenSpy).toEqual({
        name: 'John Foo Bar',
        email: 'foo@example.com',
        accessToken: 'encrypted'
      })
    })
  })
})
