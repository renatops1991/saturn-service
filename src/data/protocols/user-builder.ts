import { SignUpUserDto } from '@/presentation/dtos/user/signup-user.dto'
import { UserBasicInfoType } from '@/data/types/user-basic-info-type'

export interface IUserBuilder {
  buildUserBasicInfo: (userDto: SignUpUserDto) => UserBasicInfoType
}
