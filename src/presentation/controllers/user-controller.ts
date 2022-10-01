import { UserDto } from '../dtos/user.dto'
import { MissingMandatoryParamError } from '../errors/missing-mandatory-param-error'
import { badRequest } from '../http-helper'
import { HttpResponse } from '../protocols/http'

export class UserController {
  create (userDto: UserDto): HttpResponse {
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
