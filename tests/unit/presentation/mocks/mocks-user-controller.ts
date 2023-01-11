import { IUser } from '@/domain/protocols/user'
import {
  SignUpUserDto,
  UpdateConfirmUserDto,
  UserOutputDto,
  UpdateUserOutputDto,
  UpdateUserDto,
  UpdateUserPasswordDto,
  GetUserOutputDto,
  FilterUserDto
} from '@/main/dtos/user'
import { fixtureUpdateUserOutput, fixtureUserOutput } from '@/tests/unit/presentation/fixtures/fixtures-user'

export const mocksUserController = (): IUser => {
  class UserStub implements IUser {
    async create (user: SignUpUserDto): Promise<UserOutputDto> {
      return await new Promise(resolve => resolve(fixtureUserOutput()))
    }

    async updateConfirmUser (updateConfirmUserDto: UpdateConfirmUserDto): Promise<void> {
      return await Promise.resolve()
    }

    async update (updateUserDto: UpdateUserDto): Promise<UpdateUserOutputDto> {
      return await Promise.resolve(fixtureUpdateUserOutput())
    }

    async updateUserPassword (redefineUserPasswordDto: UpdateUserPasswordDto): Promise<void> {
      return await Promise.resolve()
    }

    async getUser (userId: string): Promise<GetUserOutputDto> {
      return await Promise.resolve(fixtureUpdateUserOutput())
    }

    async getAllUsers (filterUserDto: FilterUserDto): Promise<GetUserOutputDto[]> {
      return await Promise.resolve([fixtureUpdateUserOutput()])
    }
  }

  return new UserStub()
}
