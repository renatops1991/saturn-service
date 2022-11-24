import { SignUpUserDto } from '@/main/dtos/user/signup-user.dto'
import { UserBasicInfoType } from '@/data/types/user-basic-info-type'

export interface IUserBuilder {
  buildUserBasicInfo: (userDto: SignUpUserDto) => UserBasicInfoType
}
