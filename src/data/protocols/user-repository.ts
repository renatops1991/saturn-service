import { CreateUserDto, LoadUserDto, UserOutputDto } from '@/presentation/dtos/user'

export interface IUserRepository {
  create: (userDto: Omit<CreateUserDto, 'passwordConfirmation'>) => Promise<UserOutputDto>
  loadByEmail: (email: string) => Promise<LoadUserDto>
  updateAccessToken: (userId: string, token: string) => Promise<void>
}
