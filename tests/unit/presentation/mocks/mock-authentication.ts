import { IAuthentication } from '@/domain/protocols/authentication'
import { LoginUserOutputDto } from '@/presentation/dtos/user/login-user-output.dto'
import { LoginUserDto } from '@/presentation/dtos/user/login-user.dto'
import { fixturesLoginUserOutput } from '../fixtures/fixtures-user'

export const mockAuthentication = (): IAuthentication => {
  class AuthenticationStub implements IAuthentication {
    async auth (loginUserDto: LoginUserDto): Promise<LoginUserOutputDto> {
      return fixturesLoginUserOutput()
    }
  }

  return new AuthenticationStub()
}
