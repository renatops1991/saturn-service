import { SignUpUserDto, UserOutputDto } from '@/main/dtos/user'
export interface IUser {
  create: (user: SignUpUserDto) => Promise<UserOutputDto>
}
