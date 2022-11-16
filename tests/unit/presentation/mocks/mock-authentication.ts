import { IAuthentication } from '@/domain/protocols/authentication'
import { SignInUserOutputDto } from '@/presentation/dtos/user/signin-user-output.dto'
import { SignInUserDto } from '@/presentation/dtos/user/signin-user.dto'
import { fixturesLoginUserOutput } from '../fixtures/fixtures-user'

export const mockAuthentication = (): IAuthentication => {
  class AuthenticationStub implements IAuthentication {
    async auth (signInUserDto: SignInUserDto): Promise<SignInUserOutputDto> {
      return fixturesLoginUserOutput()
    }
  }

  return new AuthenticationStub()
}
