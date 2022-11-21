import { IAuthentication } from '@/domain/protocols/authentication'
import { SignInUserDto } from '@/presentation/dtos/user/signin-user.dto'
import { badRequest, serverError, success, unauthorized } from '@/presentation/http-helper'
import { IController } from '@/presentation/protocols/controller'
import { IHttpResponse } from '@/presentation/protocols/http'
import { IValidation } from '@/presentation/protocols/validation'

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
