import { UserDto } from '../dtos/user.dto'
import { MissingMandatoryParamError } from '../errors/missing-mandatory-param-error'
import { badRequest } from '../http-helper'
import { Controller } from '../protocols/controller'
import { HttpResponse } from '../protocols/http'
import { Validation } from '../protocols/validation'

export class SignUpUserController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  handle (userDto: UserDto): HttpResponse {
    this.validation.validate(userDto)

    if (!userDto.name) {
      return badRequest(new MissingMandatoryParamError('name'))
    }

    if (!userDto.email) {
      return badRequest(new MissingMandatoryParamError('email'))
    }

    if (!userDto.password) {
      return badRequest(new MissingMandatoryParamError('password'))
    }

    if (!userDto.passwordConfirmation) {
      return badRequest(new MissingMandatoryParamError('passwordConfirmation'))
    }
  }
}
