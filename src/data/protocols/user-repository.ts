import { SignUpUserDto, LoadUserDto, UserOutputDto, UpdateConfirmUserDto } from '@/main/dtos/user'

export interface IUserRepository {
  create: (userDto: Omit<SignUpUserDto, 'passwordConfirmation'>) => Promise<UserOutputDto>
  loadByEmail: (email: string) => Promise<LoadUserDto>
  loadByToken: (accessToken: string, role?: string) => Promise<LoadUserDto>
  updateAccessToken: (userId: string, token: string) => Promise<void>
  updateConfirmUser: (updateConfirmUserDto: UpdateConfirmUserDto) => Promise<void>
}
