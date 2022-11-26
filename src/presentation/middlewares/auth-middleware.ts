import { IMiddleware } from '@/presentation/protocols/middleware'
import { AccessDeniedError } from '@/presentation/errors/access-denied-error'
import { IHttpResponse } from '@/presentation/protocols/http'
import { forbidden, serverError, success } from '../http-helper'
import { AuthenticationDto } from '@/main/dtos/authentication.dto'
import { IAuthentication } from '@/domain/protocols/authentication'

export class AuthMiddleware implements IMiddleware {
  constructor (
    private readonly authentication: IAuthentication,
    private readonly role?: string
  ) {}

  async handle (authenticationDto: AuthenticationDto): Promise<IHttpResponse> {
    try {
      const { accessToken } = authenticationDto
      if (!accessToken) {
        return forbidden(new AccessDeniedError().serializeErrors())
      }

      const userAuthenticate = await this.authentication.loadUserByToken(accessToken, this.role)
      if (!userAuthenticate) {
        return forbidden(new AccessDeniedError().serializeErrors())
      }
      return success({
        accountId: userAuthenticate.id
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
