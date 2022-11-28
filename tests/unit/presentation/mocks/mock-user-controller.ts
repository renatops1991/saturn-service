import { IUser } from '@/domain/protocols/user'
import { SignUpUserDto, UpdateConfirmUserDto, UserOutputDto } from '@/main/dtos/user'
import { fixturesUserOutput } from '../fixtures/fixtures-user'

export const mockUserController = (): IUser => {
  class UserStub implements IUser {
    async create (user: SignUpUserDto): Promise<UserOutputDto> {
      return await new Promise(resolve => resolve(fixturesUserOutput()))
    }

    async updateConfirmUser (updateConfirmUserDto: UpdateConfirmUserDto): Promise<void> {
      return await Promise.resolve()
    }
  }

  return new UserStub()
}
