import { IAuthentication } from '@/domain/protocols/authentication'
import { LoadUserDto, SignInUserDto, UserOutputDto } from '@/main/dtos/user'
import { fixtureLoadUser, fixtureUserOutput } from '@/tests/unit/presentation/fixtures/fixtures-user'

export const mockAuthentication = (): IAuthentication => {
  class AuthenticationStub implements IAuthentication {
    async auth (signInUserDto: SignInUserDto): Promise<UserOutputDto> {
      return fixtureUserOutput()
    }

    async loadByToken (accessToken: string, role?: string): Promise<LoadUserDto> {
      return fixtureLoadUser()
    }
  }

  return new AuthenticationStub()
}
