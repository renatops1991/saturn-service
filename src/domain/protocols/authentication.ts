import { LoginUserOutputDto } from '@/presentation/dtos/user/login-user-output.dto'
import { LoginUserDto } from '@/presentation/dtos/user/login-user.dto'

export interface IAuthentication {
  auth: (loginUserDto: LoginUserDto) => Promise<LoginUserOutputDto>
}
