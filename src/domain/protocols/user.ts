import { CreateUserOutputDto } from '@/presentation/dtos/user/create-user-output.dto'
import { CreateUserDto } from '@/presentation/dtos/user/create-user.dto'

export interface IUser {
  create: (user: CreateUserDto) => Promise<CreateUserOutputDto>
}
