import { SignInUserOutputDto } from '@/presentation/dtos/user/signin-user-output.dto'
import { SignInUserDto } from '@/presentation/dtos/user/signin-user.dto'

export interface IAuthentication {
  auth: (signInUserDto: SignInUserDto) => Promise<SignInUserOutputDto>
}
