import { type IAuthentication } from '@/domain/protocols/authentication'
import { type LoadUserDto, type SignInUserDto, type UserOutputDto } from '@/main/dtos/user'
import { fixtureLoadUser, fixtureUserOutput } from '@/tests/unit/presentation/fixtures/fixtures-user'

export const mocksAuthentication = (): IAuthentication => {
  class AuthenticationStub implements IAuthentication {
    async auth (signInUserDto: SignInUserDto): Promise<UserOutputDto | null> {
      return fixtureUserOutput()
    }

    async loadByToken (accessToken: string, role?: string): Promise<LoadUserDto | null> {
      return fixtureLoadUser()
    }
  }

  return new AuthenticationStub()
}
