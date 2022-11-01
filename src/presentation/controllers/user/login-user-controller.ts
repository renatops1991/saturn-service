import { LoginUserDto } from '@/presentation/dtos/user/login-user.dto'
import { MissingMandatoryParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/http-helper'
import { IController } from '@/presentation/protocols/controller'
import { IEmailValidator } from '@/presentation/protocols/email-validator'
import { IHttpResponse } from '@/presentation/protocols/http'

export class LoginUserController implements IController {
  constructor (private readonly emailValidator: IEmailValidator) {}
  async handle (loginUserDto: LoginUserDto): Promise<IHttpResponse> {
    const requiredFields = ['email', 'password']
    for (const field of requiredFields) {
      if (!loginUserDto[field]) {
        return await new Promise(resolve => resolve(badRequest(new MissingMandatoryParamError(field).serializeErrors())))
      }
    }

    this.emailValidator.isValid(loginUserDto.email)
  }
}
