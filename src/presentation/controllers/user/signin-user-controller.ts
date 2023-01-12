import type { IAuthentication } from '@/domain/protocols/authentication'
import type { IController } from '@/presentation/protocols/controller'
import type { IHttpResponse } from '@/presentation/protocols/http'
import type { IValidation } from '@/presentation/protocols/validation'
import type { SignInUserDto } from '@/main/dtos/user/signin-user.dto'
import {
  badRequest,
  serverError,
  success,
  unauthorized
} from '@/presentation/http-helper'

export class SignInUserController implements IController {
  constructor (
    private readonly authentication: IAuthentication,
    private readonly validation: IValidation
  ) { }

  async handle (signInUserDto: SignInUserDto): Promise<IHttpResponse> {
    try {
      const isError = this.validation.validate(signInUserDto)
      if (isError) {
        return badRequest(isError)
      }

      const isValidAuthentication = await this.authentication.auth(signInUserDto)
      if (!isValidAuthentication) {
        return unauthorized()
      }

      return success(isValidAuthentication)
    } catch (error) {
      return serverError(error)
    }
  }
}
