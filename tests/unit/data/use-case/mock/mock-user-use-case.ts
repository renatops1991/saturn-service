import { UserBuilder } from '@/data/builders/user-builder'
import { Encrypted } from '@/data/protocols/encrypted'
import { UserRepository } from '@/data/protocols/user-repository'
import { UserBasicInfo } from '@/types/user-basic-info'
import { CreateUserOutputDto } from '@/presentation/dtos/user/create-user-output.dto'
import { CreateUserDto } from '@/presentation/dtos/user/create-user.dto'
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
