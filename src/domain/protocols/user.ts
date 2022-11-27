import { SignUpUserDto, UpdateConfirmUserDto, UserOutputDto } from '@/main/dtos/user'
export interface IUser {
  create: (user: SignUpUserDto) => Promise<UserOutputDto>
  updateConfirmUser: (updateConfirmUser: UpdateConfirmUserDto) => Promise<void>
}
