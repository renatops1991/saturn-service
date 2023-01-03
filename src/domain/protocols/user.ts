import {
  UpdateUserPasswordDto,
  SignUpUserDto,
  UpdateConfirmUserDto,
  UserOutputDto,
  GetUserOutputDto,
  GetUserDto
} from '@/main/dtos/user'
import { UpdateUserOutputDto } from '@/main/dtos/user/update-user-output.dto'
import { UpdateUserDto } from '@/main/dtos/user/update-user.dto'
export interface IUser {
  create: (user: SignUpUserDto) => Promise<UserOutputDto>
  updateConfirmUser: (updateConfirmUserDto: UpdateConfirmUserDto) => Promise<void>
  update: (updateUserDto: UpdateUserDto) => Promise<UpdateUserOutputDto>
  updateUserPassword: (redefineUserPasswordDto: UpdateUserPasswordDto) => Promise<void>
  getUser: (userId: string) => Promise<GetUserOutputDto>
  getAllUsers: (getUserDto: GetUserDto) => Promise<GetUserOutputDto[]>
}
