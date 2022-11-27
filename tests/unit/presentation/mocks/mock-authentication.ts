import { IAuthentication } from '@/domain/protocols/authentication'
import { LoadUserDto, SignInUserDto, UserOutputDto } from '@/main/dtos/user'
import { fixturesLoadUser, fixturesUserOutput } from '../fixtures/fixtures-user'

export const mockAuthentication = (): IAuthentication => {
  class AuthenticationStub implements IAuthentication {
    async auth (signInUserDto: SignInUserDto): Promise<UserOutputDto> {
      return fixturesUserOutput()
    }

    async loadByToken (accessToken: string, role?: string): Promise<LoadUserDto> {
      return fixturesLoadUser()
    }
  }

  return new AuthenticationStub()
}
