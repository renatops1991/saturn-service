import type { IUserBuilder } from '@/data/protocols/user-builder'
import type { UserBasicInfoType, UserType } from '@/data/types'
import type { SignUpUserDto } from '@/main/dtos/user'
import type { UpdateUserDto } from '@/main/dtos/user/update-user.dto'
import {
  fixtureBuildUser,
  fixtureBuildUserBasicInfo
} from '@/tests/unit/data/builders/fixtures/fixtures-user-builder'

export const mockUserBuilder = (): IUserBuilder => {
  class UserBuilderStub implements IUserBuilder {
    buildUserBasicInfo (userDto: Omit<SignUpUserDto, 'passwordConfirmation'>): UserBasicInfoType {
      return fixtureBuildUserBasicInfo()
    }

    buildUser (userDto: UpdateUserDto): UserType {
      return fixtureBuildUser()
    }
  }

  return new UserBuilderStub()
}
