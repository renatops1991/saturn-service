import { CreateUserDto } from '@/presentation/dtos/user/create-user.dto'
import { UserBasicInfo } from '@/domain/types/user-basic-info'

export interface IUserBuilder {
  buildUserBasicInfo: (userDto: CreateUserDto) => UserBasicInfo
}
