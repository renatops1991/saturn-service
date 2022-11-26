import { IHashed } from '@/data/protocols/hashed'
import { IUserRepository } from '@/data/protocols/user-repository'
import { UserOutputDto } from '@/main/dtos/user/user-output.dto'
import { SignUpUserDto } from '@/main/dtos/user/signup-user.dto'
import { fixturesUserOutput, fixturesLoadUser } from '@/tests/unit/presentation/fixtures/fixtures-user'
import { LoadUserDto } from '@/main/dtos/user/load-user.dto'
import { ICryptography } from '@/data/protocols/cryptography'

export const mockHashed = (): IHashed => {
  class HashedStub implements IHashed {
    async hash (input: string): Promise<string> {
      return await new Promise(resolve => resolve('hashed'))
    }

    async compare (value: string, hash: string): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }
  return new HashedStub()
}

export const mockCryptography = (): ICryptography => {
  class CryptographyStub implements ICryptography {
    async encrypt (userId: string): Promise<string> {
      return await Promise.resolve('encrypted')
    }
  }
  return new CryptographyStub()
}

export const mockUserRepository = (): IUserRepository => {
  class UserRepositoryStub implements IUserRepository {
    async create (userDto: SignUpUserDto): Promise<UserOutputDto> {
      return await new Promise(resolve => resolve(fixturesUserOutput()))
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