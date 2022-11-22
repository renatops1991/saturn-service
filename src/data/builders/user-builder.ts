import { User } from '@/domain/entities/user'
import { CreateUserDto } from '@/presentation/dtos/user/create-user.dto'
import { IUserBuilder } from '@/data/protocols/user-builder'
import { UserBasicInfoType } from '@/data/types/user-basic-info-type'

export class UserBuilder implements IUserBuilder {
  buildUserBasicInfo (
    userDto: Omit<CreateUserDto, 'passwordConfirmation'>
  ): UserBasicInfoType {
    const user = new User().getUserBasicInfo()
    user.name = userDto.name
    user.email = userDto.email
    user.password = userDto.password
    user.confirmUser = userDto?.confirmUser ?? false

    return user
  }
}
