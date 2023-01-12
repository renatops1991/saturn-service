import { type IHashed } from '@/data/protocols/hashed'
import { type IUserRepository } from '@/data/protocols/user-repository'
import {
  type UpdateConfirmUserDto,
  type UpdateUserOutputDto,
  type UpdateUserDto,
  type LoadUserDto,
  type SignUpUserDto,
  type UserOutputDto,
  type UpdateUserPasswordDto,
  type GetUserOutputDto,
  type FilterUserDto
} from '@/main/dtos/user'
import {
  fixtureUserOutput,
  fixtureLoadUser,
  fixtureUpdateUserOutput
} from '@/tests/unit/presentation/fixtures/fixtures-user'

import { type ICryptography } from '@/data/protocols/cryptography'

export const mockHashed = (): IHashed => {
  class HashedStub implements IHashed {
    async hash (input: string): Promise<string> {
      return await new Promise(resolve => { resolve('hashed') })
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

    async decrypt (password: string): Promise<string> {
      return await Promise.resolve('decrypt')
    }
  }
  return new CryptographyStub()
}

export const mockUserRepository = (): IUserRepository => {
  class UserRepositoryStub implements IUserRepository {
    async create (userDto: SignUpUserDto): Promise<UserOutputDto> {
      return await new Promise(resolve => { resolve(fixtureUserOutput()) })
    }

    async loadByEmail (email: string): Promise<LoadUserDto> {
      return await new Promise(resolve => { resolve(fixtureLoadUser()) })
    }

    async updateAccessToken (id: string, token: string): Promise<void> {
      await Promise.resolve()
    }

    async loadByToken (accessToken: string, role?: string): Promise<LoadUserDto> {
      return await new Promise(resolve => { resolve(fixtureLoadUser()) })
    }

    async updateConfirmUser (updateConfirmUserDto: UpdateConfirmUserDto): Promise<void> {
      await Promise.resolve()
    }

    async update (updateUserDto: UpdateUserDto): Promise<UpdateUserOutputDto> {
      return await new Promise(resolve => { resolve(fixtureUpdateUserOutput()) })
    }

    async updateUserPassword (updateUserPassword: Omit<UpdateUserPasswordDto, 'passwordConfirmation'>): Promise<void> {
      await Promise.resolve()
    }

    async getUser (userId: string): Promise<GetUserOutputDto> {
      return await Promise.resolve(fixtureUpdateUserOutput())
    }

    async getAllUsers (filterUserDto: FilterUserDto): Promise<GetUserOutputDto[]> {
      return await Promise.resolve([fixtureUpdateUserOutput(), fixtureUpdateUserOutput()])
    }
  }

  return new UserRepositoryStub()
}
