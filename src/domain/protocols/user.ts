import { SignUpUserDto, UserOutputDto } from '@/presentation/dtos/user/'
export interface IUser {
  create: (user: SignUpUserDto) => Promise<UserOutputDto>
}
