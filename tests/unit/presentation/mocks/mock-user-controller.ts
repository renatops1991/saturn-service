import { IUser } from '@/domain/protocols/user'
import { SignUpUserDto, UpdateConfirmUserDto, UserOutputDto } from '@/main/dtos/user'
import { UpdateUserOutputDto } from '@/main/dtos/user/update-user-output.dto'
import { UpdateUserDto } from '@/main/dtos/user/update-user.dto'
import { fixturesUpdateUserOutput, fixturesUserOutput } from '@/tests/unit/presentation/fixtures/fixtures-user'

export const mockUserController = (): IUser => {
  class UserStub implements IUser {
    async create (user: SignUpUserDto): Promise<UserOutputDto> {
      return await new Promise(resolve => resolve(fixturesUserOutput()))
    }

    async updateConfirmUser (updateConfirmUserDto: UpdateConfirmUserDto): Promise<void> {
      return await Promise.resolve()
    }

    async update (updateUserDto: UpdateUserDto): Promise<UpdateUserOutputDto> {
      return await Promise.resolve(fixturesUpdateUserOutput())
    }
  }

  return new UserStub()
}
