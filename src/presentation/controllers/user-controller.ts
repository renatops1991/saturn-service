import { UserDto } from '../dtos/user.dto'
import { HttpResponse } from '../protocols/http'

export class UserController {
  create (userDto: UserDto): HttpResponse {
    if (!userDto.name) {
      return {
        statusCode: 400,
        body: new Error('Missing mandatory params: name')
      }
    }

    if (!userDto.email) {
      return {
        statusCode: 400,
        body: new Error('Missing mandatory params: email')
      }
    }
  }
}
