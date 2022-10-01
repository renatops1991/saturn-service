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
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!userDto[field]) {
        return badRequest(new MissingMandatoryParamError(field))
      }
    }
  }
}
