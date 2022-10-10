import { CreateUserDto } from '@/presentation/dtos/user/create-user.dto'
import { UserBasicInfo } from '@/types/user-basic-info'

export interface UserBuilderInterface {
  buildUserBasicInfo: (userDto: CreateUserDto) => UserBasicInfo
}
