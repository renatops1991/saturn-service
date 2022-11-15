import { IEncrypted } from '@/data/protocols/encrypted'
import { IUserRepository } from '@/data/protocols/user-repository'
import { UserBuilder } from '@/data/builders/user-builder'
import { UserBasicInfo } from '@/data/types/user-basic-info'
import { UserOutputDto } from '@/presentation/dtos/user/user-output.dto'
import { CreateUserDto } from '@/presentation/dtos/user/create-user.dto'
import { fixturesCreateUser, fixturesCreateUserOutput } from '@/tests/unit/presentation/fixtures/fixtures-user'

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
    private readonly fakeUser = fixturesCreateUserOutput()

    async create (userDto: CreateUserDto): Promise<UserOutputDto> {
      return await new Promise(resolve => resolve(this.fakeUser))
    }

    async loadByEmail (email: string): Promise<UserOutputDto> {
      return await new Promise(resolve => resolve(this.fakeUser))
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
