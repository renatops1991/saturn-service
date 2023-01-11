import {
  UpdateUserPasswordDto,
  SignUpUserDto,
  UpdateConfirmUserDto,
  UserOutputDto,
  GetUserOutputDto,
  FilterUserDto
} from '@/main/dtos/user'
import { UpdateUserOutputDto } from '@/main/dtos/user/update-user-output.dto'
import { UpdateUserDto } from '@/main/dtos/user/update-user.dto'
export interface IUser {
  create: (user: SignUpUserDto) => Promise<UserOutputDto>
  updateConfirmUser: (updateConfirmUserDto: UpdateConfirmUserDto) => Promise<void>
  update: (updateUserDto: UpdateUserDto) => Promise<UpdateUserOutputDto>
  updateUserPassword: (redefineUserPasswordDto: UpdateUserPasswordDto) => Promise<void>
  getUser: (userId: string) => Promise<GetUserOutputDto>
  getAllUsers: (filterUserDto: FilterUserDto) => Promise<GetUserOutputDto[]>
}
