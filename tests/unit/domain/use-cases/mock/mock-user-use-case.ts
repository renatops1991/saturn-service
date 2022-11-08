import { IEncrypted } from '@/data/protocols/encrypted'
import { IUserRepository } from '@/data/protocols/user-repository'
import { UserBuilder } from '@/domain/builders/user-builder'
import { CreateUserOutputDto } from '@/presentation/dtos/user/create-user-output.dto'
import { CreateUserDto } from '@/presentation/dtos/user/create-user.dto'
import { fixturesCreateUser, fixturesCreateUserOutput } from '@/tests/unit/presentation/fixtures/fixtures-user'
import { UserBasicInfo } from '@/domain/types/user-basic-info'

export const mockEncrypted = (): IEncrypted => {
  class EncryptedStub {
    async encrypt (input: string): Promise<string> {
      return await new Promise(resolve => resolve('hashedPassword'))
    }
  }
  return new EncryptedStub()
}

export const mockUserRepository = (): IUserRepository => {
  class UserRepositoryStub implements IUserRepository {
    async create (userDto: CreateUserDto): Promise<CreateUserOutputDto> {
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
