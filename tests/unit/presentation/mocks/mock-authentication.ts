import { IAuthentication } from '@/domain/protocols/authentication'
import { SignInUserDto, UserOutputDto } from '@/presentation/dtos/user'
import { fixturesUserOutput } from '../fixtures/fixtures-user'

export const mockAuthentication = (): IAuthentication => {
  class AuthenticationStub implements IAuthentication {
    async auth (signInUserDto: SignInUserDto): Promise<UserOutputDto> {
      return fixturesUserOutput()
    }
  }

  return new AuthenticationStub()
}
