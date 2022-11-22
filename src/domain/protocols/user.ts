import { CreateUserDto, UserOutputDto } from '@/presentation/dtos/user/'
export interface IUser {
  create: (user: CreateUserDto) => Promise<UserOutputDto>
}
