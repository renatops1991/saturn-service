import { IUserBuilder } from '@/data/protocols/user-builder'
import { UserBasicInfoType, UserType } from '@/data/types'
import { SignUpUserDto } from '@/main/dtos/user'
import { UpdateUserDto } from '@/main/dtos/user/update-user.dto'
import { fixturesUpdateUserOutput } from '@/tests/unit/presentation/fixtures/fixtures-user'

export const mockUserBuilder = (): IUserBuilder => {
  class UserBuilderStub implements IUserBuilder {
    buildUserBasicInfo (userDto: Omit<SignUpUserDto, 'passwordConfirmation'>): UserBasicInfoType {
      return {
        name: 'John Foo Bar',
        email: 'foo@example.com',
        password: 'hashed',
        confirmUser: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    }

    buildUser (userDto: UpdateUserDto): UserType {
      return fixturesUpdateUserOutput()
    }
  }

  return new UserBuilderStub()
}
