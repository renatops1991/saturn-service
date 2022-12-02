import { SignUpUserDto } from '@/main/dtos/user/signup-user.dto'
import { UserBasicInfoType, UserType } from '@/data/types'
import { UpdateUserDto } from '@/main/dtos/user/update-user.dto'
export interface IUserBuilder {
  buildUserBasicInfo: (userDto: SignUpUserDto) => UserBasicInfoType
  buildUser: (updateUserDto: UpdateUserDto) => UserType
}
