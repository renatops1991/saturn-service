import { CreateUserDto } from '@/presentation/dtos/user/create-user.dto'
import { UserBasicInfoType } from '@/data/types/user-basic-info-type'

export interface IUserBuilder {
  buildUserBasicInfo: (userDto: CreateUserDto) => UserBasicInfoType
}
