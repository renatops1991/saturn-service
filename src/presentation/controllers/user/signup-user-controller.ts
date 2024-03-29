
import type { IAuthentication } from '@/domain/protocols/authentication'
import type { IUser } from '@/domain/protocols/user'
import type { SignUpUserDto } from '@/main/dtos/user/signup-user.dto'
import { EmailInUseError } from '@/presentation/errors'
import {
  badRequest,
  created,
  forbidden,
  serverError
} from '@/presentation/http-helper'
import type { IController } from '@/presentation/protocols/controller'
import type { IHttpResponse } from '@/presentation/protocols/http'
import type { IValidation } from '@/presentation/protocols/validation'
export class SignUpUserController implements IController {
  constructor (
    private readonly user: IUser,
    private readonly validation: IValidation,
    private readonly authentication: IAuthentication
  ) {}

  async handle (userDto: SignUpUserDto): Promise<IHttpResponse> {
    try {
      const isError = this.validation.validate(userDto)
      if (isError) {
        return badRequest(isError)
      }

      const { email, password } = userDto
      const user = await this.user.create(userDto)

      if (!user) {
        return forbidden(new EmailInUseError().serializeErrors())
      }

      const accessToken = await this.authentication.auth({
        email,
        password
      })
      return created(accessToken)
    } catch (error) {
      return serverError(error)
    }
  }
}
