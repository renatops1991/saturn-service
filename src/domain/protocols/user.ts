import { UserOutputDto } from '@/presentation/dtos/user/user-output.dto'
import { CreateUserDto } from '@/presentation/dtos/user/create-user.dto'

export interface IUser {
  create: (user: CreateUserDto) => Promise<UserOutputDto>
}
