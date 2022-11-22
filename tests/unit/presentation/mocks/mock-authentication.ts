import { IAuthentication } from '@/domain/protocols/authentication'
import { SignInUserOutputDto, SignInUserDto } from '@/presentation/dtos/user'
import { fixturesLoginUserOutput } from '../fixtures/fixtures-user'

export const mockAuthentication = (): IAuthentication => {
  class AuthenticationStub implements IAuthentication {
    async auth (signInUserDto: SignInUserDto): Promise<SignInUserOutputDto> {
      return fixturesLoginUserOutput()
    }
  }

  return new AuthenticationStub()
}
