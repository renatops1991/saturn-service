import { UserDto } from '../dtos/user.dto'
import { MissingMandatoryParamError } from '../errors/missing-mandatory-param-error'
import { HttpResponse } from '../protocols/http'

export class UserController {
  create (userDto: UserDto): HttpResponse {
    if (!userDto.name) {
      return {
        statusCode: 400,
        body: new MissingMandatoryParamError('name')
      }
    }

    if (!userDto.email) {
      return {
        statusCode: 400,
        body: new MissingMandatoryParamError('email')
      }
    }
  }
}
