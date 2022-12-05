
import { ICryptography } from '@/data/protocols/cryptography'
import { IHashed } from '@/data/protocols/hashed'
import { IUserRepository } from '@/data/protocols/user-repository'
import { User } from '@/data/use-cases/user'
import {
  fixturesCreateUser,
  fixturesUserOutput,
  fixturesLoginUser,
  fixturesLoadUser,
  fixturesUpdateConfirmUser,
  fixturesUpdateUser
} from '@/tests/unit/presentation/fixtures/fixtures-user'
import { mockCryptography, mockHashed, mockUserRepository } from '@/tests/unit/data/use-cases/mock/mock-user-use-case'
import { IUserBuilder } from '@/data/protocols/user-builder'
import { mockUserBuilder } from '../builders/mock/mock-user-builder'
import MockDate from 'mockdate'

type SutType = {
  sut: User
  hashedStub: IHashed
  cryptographyStub: ICryptography
  userRepositoryStub: IUserRepository
  userBuilderStub: IUserBuilder
}

const makeSut = (): SutType => {
  const hashedStub = mockHashed()
  const cryptographyStub = mockCryptography()
  const userRepositoryStub = mockUserRepository()
  const userBuilderStub = mockUserBuilder()
  const sut = new User(hashedStub, cryptographyStub, userRepositoryStub, userBuilderStub)
  return {
    sut,
    hashedStub,
    cryptographyStub,
    userRepositoryStub,
    userBuilderStub
  }
}

describe('User use case', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  describe('Create', () => {
    it('Should call Hashed with correct password', async () => {
      const { sut, hashedStub, userRepositoryStub } = makeSut()
      jest.spyOn(userRepositoryStub, 'loadByEmail').mockResolvedValue(null)
      const hashSpy = jest.spyOn(hashedStub, 'hash')
      const user = fixturesCreateUser()
      await sut.create(user)
      expect(hashSpy).toHaveBeenCalledWith('12345')
    })

    it('Should forward the error if Hashed throws error', async () => {
      const { sut, hashedStub, userRepositoryStub } = makeSut()
      jest.spyOn(userRepositoryStub, 'loadByEmail').mockResolvedValue(null)
      jest.spyOn(hashedStub, 'hash').mockRejectedValueOnce(new Error())
      const user = fixturesCreateUser()
      const expectedResponse = sut.create(user)
      await expect(expectedResponse).rejects.toThrow()
    })

    it('Should call create method of the UserRepository with correct values', async () => {
      const { sut, userRepositoryStub } = makeSut()
      jest.spyOn(userRepositoryStub, 'loadByEmail').mockResolvedValue(null)
      const createSpy = jest.spyOn(userRepositoryStub, 'create')
      const user = fixturesCreateUser()
      const expectedResponse = Object.assign({
        ...fixturesCreateUser(),
        password: 'hashed',
        createdAt: new Date(),
        updatedAt: new Date()
      })
      await sut.create(user)
      expect(createSpy).toHaveBeenCalledWith(expectedResponse)
    })

    it('Should call buildUserBasicInfo method of the UserBuilder Class with corrects values', async () => {
      const { sut, userBuilderStub, userRepositoryStub } = makeSut()
      jest.spyOn(userRepositoryStub, 'loadByEmail').mockResolvedValue(null)
      const buildUserBasicInfoSpy = jest.spyOn(userBuilderStub, 'buildUserBasicInfo')
      await sut.create(fixturesCreateUser())
      expect(buildUserBasicInfoSpy).toHaveBeenCalledWith({
        name: 'John Foo Bar',
        email: 'foo@example.com',
        password: 'hashed',
        confirmUser: false
      })
    })

    it('Should forward the error if UserRepository throws error', async () => {
      const { sut, userRepositoryStub } = makeSut()
      jest.spyOn(userRepositoryStub, 'loadByEmail').mockResolvedValue(null)
      jest.spyOn(userRepositoryStub, 'create').mockRejectedValueOnce(new Error())
      const user = fixturesCreateUser()
      const expectedResponse = sut.create(user)
      await expect(expectedResponse).rejects.toThrow()
    })

    it('Should call loadByEmail method with correct value', async () => {
      const { sut, userRepositoryStub } = makeSut()
      const loadByEmailSpy = jest.spyOn(userRepositoryStub, 'loadByEmail')
      const user = fixturesCreateUser()
      await sut.create(user)
      expect(loadByEmailSpy).toHaveBeenCalledWith('foo@example.com')
    })

    it('Should return null if email is in used', async () => {
      const { sut, userRepositoryStub } = makeSut()
      const user = fixturesCreateUser()
      jest.spyOn(userRepositoryStub, 'loadByEmail')
      const expectedResponse = await sut.create(user)
      expect(expectedResponse).toBeNull()
    })

    it('Should return an user on success', async () => {
      const { sut, userRepositoryStub } = makeSut()
      jest.spyOn(userRepositoryStub, 'loadByEmail').mockResolvedValue(null)
      const user = fixturesCreateUser()
      const expectedResponse = await sut.create(user)
      expect(expectedResponse).toEqual(fixturesUserOutput())
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
      const expectedResponse = await sut.auth(user)
      expect(expectedResponse).toBeNull()
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
      const expectedResponse = await sut.auth(user)
      expect(expectedResponse).toBeNull()
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

  describe('LoadByToken', () => {
    it('Should call Decrypt method of the Cryptography with correct value', async () => {
      const { sut, cryptographyStub } = makeSut()
      const decryptSpy = jest
        .spyOn(cryptographyStub, 'decrypt')
      await sut.loadByToken('accessToken', 'admin')
      expect(decryptSpy).toHaveBeenCalledWith('accessToken')
    })

    it('Should return null if decrypt method of the Cryptography returns null', async () => {
      const { sut, cryptographyStub } = makeSut()
      jest
        .spyOn(cryptographyStub, 'decrypt')
        .mockResolvedValueOnce(null)
      const expectedResponse = await sut.loadByToken('accessToken', 'admin')
      expect(expectedResponse).toBeNull()
    })
    it('Should call loadByToken method of the UserRepository class with correct values', async () => {
      const { sut, userRepositoryStub } = makeSut()
      const loadByTokenSpy = jest.spyOn(userRepositoryStub, 'loadByToken')
      await sut.loadByToken('accessToken', 'admin')
      expect(loadByTokenSpy).toHaveBeenCalledWith('accessToken', 'admin')
    })

    it('Should return null if loadByToken method of the UserRepository returns null', async () => {
      const { sut, userRepositoryStub } = makeSut()
      jest
        .spyOn(userRepositoryStub, 'loadByToken')
        .mockResolvedValueOnce(null)
      const expectedResponse = await sut.loadByToken('accessToken', 'admin')
      expect(expectedResponse).toBeNull()
    })

    it('Should forward the error if loadByToken method of the Cryptography class throws error', async () => {
      const { sut, userRepositoryStub } = makeSut()
      jest
        .spyOn(userRepositoryStub, 'loadByToken')
        .mockRejectedValueOnce(new Error())
      const expectedResponse = sut.loadByToken('accessToken', 'admin')
      await expect(expectedResponse).rejects.toThrow()
    })

    it('Should return an user on success', async () => {
      const { sut } = makeSut()
      const expectedResponse = await sut.loadByToken('accessToken', 'admin')
      expect(expectedResponse).toEqual(fixturesLoadUser())
    })
  })

  describe('updateConfirmUser', () => {
    it('Should call updateConfirmUser method of the UserRepository class with corrects values', async () => {
      const { sut, userRepositoryStub } = makeSut()
      const updateConfirmUserSpy = jest
        .spyOn(userRepositoryStub, 'updateConfirmUser')
      await sut.updateConfirmUser({ confirmUser: true, userId: 'foo' })
      expect(updateConfirmUserSpy).toHaveBeenCalledWith(fixturesUpdateConfirmUser())
    })

    it('Should forward the error if updateConfirmUser of the UserRepository throws error', async () => {
      const { sut, userRepositoryStub } = makeSut()
      jest
        .spyOn(userRepositoryStub, 'updateConfirmUser')
        .mockRejectedValueOnce(new Error())
      const expectedResponse = sut.updateConfirmUser(fixturesUpdateConfirmUser())
      await expect(expectedResponse).rejects.toThrow()
    })
  })

  describe('update', () => {
    it('Should call hash method with correct password if is provided', async () => {
      const { sut, hashedStub } = makeSut()
      const hashSpy = jest
        .spyOn(hashedStub, 'hash')
      await sut.update(fixturesUpdateUser())
      expect(hashSpy).toHaveBeenCalledWith('12345')
    })

    it('Should call buildUser method with corrects values', async () => {
      const { sut, userBuilderStub } = makeSut()
      const buildUserSpy = jest
        .spyOn(userBuilderStub, 'buildUser')
      await sut.update(fixturesUpdateUser())
      expect(buildUserSpy).toHaveBeenCalledWith(
        Object.assign({ ...fixturesUpdateUser(), password: 'hashed' })
      )
    })

    it('Should call buildUser method with corrects values without password field', async () => {
      const { sut, userBuilderStub } = makeSut()
      const fakeUpdateUser = fixturesUpdateUser()
      delete fakeUpdateUser.password
      delete fakeUpdateUser.passwordConfirmation
      const buildUserSpy = jest
        .spyOn(userBuilderStub, 'buildUser')

      await sut.update(fakeUpdateUser)
      const expectedResponse = fixturesUpdateUser()
      delete expectedResponse.password
      delete expectedResponse.passwordConfirmation

      expect(buildUserSpy).toHaveBeenCalledWith(expectedResponse)
    })
  })
})
