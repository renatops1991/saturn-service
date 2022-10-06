import { CreateUserDto } from '../../presentation/dtos/user/create-user.dto'
import { User } from '../entities/user'
import { UserBuilderInterface } from '../protocols/user-builder'
import { UserBasicInfo } from '../types/user-basic-info'

export class UserBuilder implements UserBuilderInterface {
  buildUserBasicInfo (userDto: CreateUserDto): UserBasicInfo {
    const user = new User().getUserBasicInfo()
    user.name = userDto.name
    user.email = userDto.email
    user.password = userDto.password
    user.passwordConfirmation = userDto.passwordConfirmation
    user.confirmUser = userDto.confirmUser

    return user
  }
}
