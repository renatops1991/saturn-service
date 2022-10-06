import { UserBuilder } from '../../../../../src/data/builders/user-builder'
import { Encrypted } from '../../../../../src/data/protocols/encrypted'
import { UserRepository } from '../../../../../src/data/protocols/user-repository'
import { UserBasicInfo } from '../../../../../src/data/types/user-basic-info'
import { CreateUserOutputDto } from '../../../../../src/presentation/dtos/user/create-user-output.dto'
import { CreateUserDto } from '../../../../../src/presentation/dtos/user/create-user.dto'
import { fixturesCreateUser, fixturesCreateUserOutput } from '../../../presentation/fixtures/fixtures-user'

export const mockEncrypted = (): Encrypted => {
  class EncryptedStub {
    async encrypt (input: string): Promise<string> {
      return await new Promise(resolve => resolve('hashedPassword'))
    }
  }
  return new EncryptedStub()
}

export const mockUserRepository = (): UserRepository => {
  class UserRepositoryStub implements UserRepository {
    async create (user: CreateUserDto): Promise<CreateUserOutputDto> {
      const fakeUser = fixturesCreateUserOutput()
      return await new Promise(resolve => resolve(fakeUser))
    }
  }

  return new UserRepositoryStub()
}

export const mockUserBuilder = (): UserBuilder => {
  class UserBuilderStub implements UserBuilder {
    buildUserBasicInfo (userDto: CreateUserDto): UserBasicInfo {
      return fixturesCreateUser()
    }
  }

  return new UserBuilderStub()
}
