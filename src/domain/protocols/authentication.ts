import { UserOutputDto, SignInUserDto } from '@/presentation/dtos/user'

export interface IAuthentication {
  auth: (signInUserDto: SignInUserDto) => Promise<UserOutputDto>
}
