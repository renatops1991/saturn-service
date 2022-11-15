import { UserOutputDto } from '@/presentation/dtos/user/user-output.dto'
import { CreateUserDto } from '@/presentation/dtos/user/create-user.dto'
import { LoadUserDto } from '@/presentation/dtos/user/load-user.dto'

export interface IUserRepository {
  create: (userDto: Omit<CreateUserDto, 'passwordConfirmation'>) => Promise<UserOutputDto>
  loadByEmail: (email: string) => Promise<LoadUserDto>
}
