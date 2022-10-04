import { User } from '../../domain/protocols/user/user'
import { CreateUserDto } from '../dtos/user/create-user.dto'
import { InvalidParamError } from '../errors/invalid-param-error'
import { MissingMandatoryParamError } from '../errors/missing-mandatory-param-error'
import { badRequest, serverError, success } from '../http-helper'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/email-validator'
import { HttpResponse } from '../protocols/http'
export class SignUpUserController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly user: User
  ) {}

  handle (userDto: CreateUserDto): HttpResponse {
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
      const user = this.user.create(userDto)
      return success(user)
    } catch (error) {
      return serverError(error)
    }
  }
}
