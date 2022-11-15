import { ICryptography } from '@/data/protocols/cryptography'
import { IUserRepository } from '@/data/protocols/user-repository'
import { UserBuilder } from '@/data/builders/user-builder'
import { UserBasicInfo } from '@/data/types/user-basic-info'
import { UserOutputDto } from '@/presentation/dtos/user/user-output.dto'
import { CreateUserDto } from '@/presentation/dtos/user/create-user.dto'
import { fixturesCreateUser, fixturesCreateUserOutput, fixturesLoadUser } from '@/tests/unit/presentation/fixtures/fixtures-user'
import { LoadUserDto } from '@/presentation/dtos/user/load-user.dto'

export const mockCryptography = (): ICryptography => {
  class EncryptedStub {
    async encrypt (input: string): Promise<string> {
      return await new Promise(resolve => resolve('encrypted'))
    }

    async compare (value: string, hash: string): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }
  return new EncryptedStub()
}

export const mockUserRepository = (): IUserRepository => {
  class UserRepositoryStub implements IUserRepository {
    async create (userDto: CreateUserDto): Promise<UserOutputDto> {
      return await new Promise(resolve => resolve(fixturesCreateUserOutput()))
    }

    async loadByEmail (email: string): Promise<LoadUserDto> {
      return await new Promise(resolve => resolve(fixturesLoadUser()))
    }

    async updateAccessToken (id: string, token: string): Promise<void> {
      return await new Promise(resolve => resolve())
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
