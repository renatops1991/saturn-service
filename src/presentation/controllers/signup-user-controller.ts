import { User } from '@/domain/user/user'
import { CreateUserDto } from '@/presentation/dtos/user/create-user.dto'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { MissingMandatoryParamError } from '@/presentation/errors/missing-mandatory-param-error'
import { badRequest, serverError, success } from '@/presentation/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { EmailValidator } from '@/presentation/protocols/email-validator'
import { HttpResponse } from '@/presentation/protocols/http'
export class SignUpUserController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly user: User
  ) {}

  async handle (userDto: CreateUserDto): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!userDto[field]) {
          return badRequest(new MissingMandatoryParamError(field))
        }
      }

      const { email, password, passwordConfirmation } = userDto
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValidEmail = this.emailValidator.isValid(email)
      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'))
      }

      userDto.confirmUser = false
      const user = await this.user.create(userDto)
      return success(user)
    } catch (error) {
      return serverError(error)
    }
  }
}
