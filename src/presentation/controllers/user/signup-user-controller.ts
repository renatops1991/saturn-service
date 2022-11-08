
import { IUser } from '@/domain/protocols/user'
import { CreateUserDto } from '@/presentation/dtos/user/create-user.dto'
import { InvalidParamError } from '@/presentation/errors'
import { badRequest, serverError, success } from '@/presentation/http-helper'
import { IController } from '@/presentation/protocols/controller'
import { IEmailValidator } from '@/presentation/protocols/email-validator'
import { IHttpResponse } from '@/presentation/protocols/http'
import { IValidation } from '@/presentation/protocols/validation'
export class SignUpUserController implements IController {
  constructor (
    private readonly emailValidator: IEmailValidator,
    private readonly user: IUser,
    private readonly validation: IValidation
  ) {}

  async handle (userDto: CreateUserDto): Promise<IHttpResponse> {
    try {
      const isError = this.validation.validate(userDto)
      if (isError) {
        return badRequest(isError)
      }

      const { email } = userDto
      const isValidEmail = this.emailValidator.isValid(email)
      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email').serializeErrors())
      }

      userDto.confirmUser = false
      const user = await this.user.create(userDto)
      return success(user)
    } catch (error) {
      return serverError(error)
    }
  }
}
