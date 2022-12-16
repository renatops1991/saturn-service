import { User } from '@/domain/entities/user'
import { Address } from '@/domain/entities/address'
import { IUserBuilder } from '@/data/protocols/user-builder'
import { UserBasicInfoType, UserType } from '@/data/types'
import { SignUpUserDto } from '@/main/dtos/user/signup-user.dto'
import { UpdateUserDto } from '@/main/dtos/user/update-user.dto'

export class UserBuilder implements IUserBuilder {
  buildUserBasicInfo (
    userDto: Omit<SignUpUserDto, 'passwordConfirmation'>
  ): UserBasicInfoType {
    const user = new User().getUserBasicInfo()
    user.name = userDto.name
    user.email = userDto.email
    user.password = userDto.password
    user.confirmUser = userDto?.confirmUser ?? false
    user.createdAt = new Date()
    user.updatedAt = new Date()

    return user
  }

  buildUser (userDto: UpdateUserDto): UserType {
    const user = new User().getUser()
    user.userId = userDto.userId
    user.birthDate = userDto.birthDate
    user.document = userDto.document
    user.updatedAt = new Date()

    if (userDto.address) {
      user.address = Address.makeAddress(userDto.address)
    }
    if (userDto.name) {
      user.name = userDto.name
    }
    if (userDto.age) {
      user.age = userDto.age
    }
    if (userDto.type) {
      user.type = userDto.type
    }
    if (userDto.password) {
      user.password = userDto.password
    }
    if (userDto?.phone && userDto.phone.length) {
      user.phone = userDto.phone
    }

    return user
  }
}
