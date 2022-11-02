import { IAuthentication } from '@/domain/protocols/authentication'
import { LoginUserDto } from '@/presentation/dtos/user/login-user.dto'
import { InvalidParamError, MissingMandatoryParamError } from '@/presentation/errors'
import { badRequest, serverError } from '@/presentation/http-helper'
import { IController } from '@/presentation/protocols/controller'
import { IEmailValidator } from '@/presentation/protocols/email-validator'
import { IHttpResponse } from '@/presentation/protocols/http'

export class LoginUserController implements IController {
  constructor (
    private readonly emailValidator: IEmailValidator,
    private readonly authentication: IAuthentication
  ) { }

  async handle (loginUserDto: LoginUserDto): Promise<IHttpResponse> {
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!loginUserDto[field]) {
          return await new Promise(resolve => resolve(badRequest(new MissingMandatoryParamError(field).serializeErrors())))
        }
      }

      const { email } = loginUserDto
      const isValidEmail = this.emailValidator.isValid(email)
      if (!isValidEmail) {
        return await new Promise(resolve => resolve(badRequest(new InvalidParamError('email').serializeErrors())))
      }

      await this.authentication.auth(loginUserDto)
    } catch (error) {
      return serverError(error)
    }
  }
}
