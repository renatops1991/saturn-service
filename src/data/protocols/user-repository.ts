import { SignUpUserDto, LoadUserDto, UserOutputDto, UpdateConfirmUserDto } from '@/main/dtos/user'
import { UpdateUserOutputDto } from '@/main/dtos/user/update-user-output.dto'
import { UpdateUserDto } from '@/main/dtos/user/update-user.dto'

export interface IUserRepository {
  create: (userDto: Omit<SignUpUserDto, 'passwordConfirmation'>) => Promise<UserOutputDto>
  loadByEmail: (email: string) => Promise<LoadUserDto>
  loadByToken: (accessToken: string, role?: string) => Promise<LoadUserDto>
  updateAccessToken: (userId: string, token: string) => Promise<void>
  updateConfirmUser: (updateConfirmUserDto: UpdateConfirmUserDto) => Promise<void>
  update: (updateUserDto: UpdateUserDto) => Promise<UpdateUserOutputDto>
}
