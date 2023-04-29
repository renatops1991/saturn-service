import type {
  UpdateUserPasswordDto,
  SignUpUserDto,
  UpdateConfirmUserDto,
  UserOutputDto,
  GetUserOutputDto,
  FilterUserDto
} from '@/main/dtos/user'
import { type UpdateUserOutputDto } from '@/main/dtos/user/update-user-output.dto'
import { type UpdateUserDto } from '@/main/dtos/user/update-user.dto'
export interface IUser {
  create: (user: SignUpUserDto) => Promise<UserOutputDto | null>
  updateConfirmUser: (updateConfirmUserDto: UpdateConfirmUserDto) => Promise<void>
  update: (updateUserDto: UpdateUserDto) => Promise<UpdateUserOutputDto>
  updateUserPassword: (redefineUserPasswordDto: UpdateUserPasswordDto) => Promise<void>
  getUser: (userId: string) => Promise<GetUserOutputDto | null>
  getAllUsers: (filterUserDto: FilterUserDto) => Promise<GetUserOutputDto[]>
}
