import { IUserBuilder } from '@/data/protocols/user-builder'
import { UserBasicInfoType, UserType } from '@/data/types'
import { SignUpUserDto } from '@/main/dtos/user'
import { UpdateUserDto } from '@/main/dtos/user/update-user.dto'
import { fixturesBuildUser, fixturesBuildUserBasicInfo } from '@/tests/unit/data/builders/fixtures-user-builder'

export const mockUserBuilder = (): IUserBuilder => {
  class UserBuilderStub implements IUserBuilder {
    buildUserBasicInfo (userDto: Omit<SignUpUserDto, 'passwordConfirmation'>): UserBasicInfoType {
      return fixturesBuildUserBasicInfo()
    }

    buildUser (userDto: UpdateUserDto): UserType {
      return fixturesBuildUser()
    }
  }

  return new UserBuilderStub()
}
