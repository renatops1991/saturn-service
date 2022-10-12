import { CreateUserDto } from '@/presentation/dtos/user/create-user.dto'
import { UserBuilderInterface } from '@/data/protocols/user-builder'
import { UserBasicInfo } from '@/types/user-basic-info'
import { User } from '@/domain/entities/user'

export class UserBuilder implements UserBuilderInterface {
  buildUserBasicInfo (userDto: Omit<CreateUserDto, 'passwordConfirmation'>): UserBasicInfo {
    const user = new User().getUserBasicInfo()
    user.name = userDto.name
    user.email = userDto.email
    user.password = userDto.password
    user.confirmUser = false

    return user
  }
}
