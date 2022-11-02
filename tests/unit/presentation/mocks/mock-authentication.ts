import { IAuthentication } from '@/domain/protocols/authentication'
import { LoginUserOutputDto } from '@/presentation/dtos/user/login-user-output.dto'
import { LoginUserDto } from '@/presentation/dtos/user/login-user.dto'

export const mockAuthentication = (): IAuthentication => {
  class AuthenticationStub implements IAuthentication {
    async auth (loginUserDto: LoginUserDto): Promise<LoginUserOutputDto> {
      return {
        name: 'John Foo Bar',
        email: 'john.foo.bar@gmail.com',
        accessToken: 'foo'
      }
    }
  }

  return new AuthenticationStub()
}
