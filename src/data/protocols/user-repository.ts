import { CreateUserOutputDto } from '@/presentation/dtos/user/create-user-output.dto'
import { CreateUserDto } from '@/presentation/dtos/user/create-user.dto'

export interface IUserRepository {
  create: (userDto: Omit<CreateUserDto, 'passwordConfirmation'>) => Promise<CreateUserOutputDto>
  loadByEmail: (email: string) => Promise<Omit<CreateUserOutputDto, 'password'>>
}
