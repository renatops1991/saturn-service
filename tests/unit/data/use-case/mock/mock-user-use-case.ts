import { Encrypted } from '@/data/protocols/encrypted'
import { UserRepository } from '@/data/protocols/user-repository'
import { CreateUserOutputDto } from '@/presentation/dtos/user/create-user-output.dto'
import { CreateUserDto } from '@/presentation/dtos/user/create-user.dto'
import { fixturesCreateUserOutput } from '@/tests/unit/presentation/fixtures/fixtures-user'

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
    async create (userDto: CreateUserDto): Promise<CreateUserOutputDto> {
      const fakeUser = fixturesCreateUserOutput()
      return await new Promise(resolve => resolve(fakeUser))
    }
  }

  return new UserRepositoryStub()
}
