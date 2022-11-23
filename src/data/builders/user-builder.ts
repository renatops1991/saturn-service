import { User } from '@/domain/entities/user'
import { SignUpUserDto } from '@/presentation/dtos/user/signup-user.dto'
import { IUserBuilder } from '@/data/protocols/user-builder'
import { UserBasicInfoType } from '@/data/types/user-basic-info-type'

export class UserBuilder implements IUserBuilder {
  buildUserBasicInfo (
    userDto: Omit<SignUpUserDto, 'passwordConfirmation'>
  ): UserBasicInfoType {
    const user = new User().getUserBasicInfo()
    user.name = userDto.name
    user.email = userDto.email
    user.password = userDto.password
    user.confirmUser = userDto?.confirmUser ?? false

    return user
  }
}
