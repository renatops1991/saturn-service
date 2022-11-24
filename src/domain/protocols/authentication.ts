import { UserOutputDto, SignInUserDto } from '@/main/dtos/user'

export interface IAuthentication {
  auth: (signInUserDto: SignInUserDto) => Promise<UserOutputDto>
}
