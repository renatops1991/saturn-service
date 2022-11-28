import { IUser } from '@/domain/protocols/user'
import { UpdateConfirmUserDto } from '@/main/dtos/user'
import { badRequest, noContent, serverError } from '@/presentation/http-helper'
import { IController } from '@/presentation/protocols/controller'
import { IHttpResponse } from '@/presentation/protocols/http'
import { IValidation } from '@/presentation/protocols/validation'

export class UpdateConfirmUserController implements IController {
  constructor (
    private readonly validation: IValidation,
    private readonly user: IUser
  ) {}

  async handle (updateConfirmUserDto: UpdateConfirmUserDto): Promise<IHttpResponse> {
    try {
      const isError = this.validation.validate(updateConfirmUserDto)
      if (isError) {
        return badRequest(isError)
      }

      await this.user.updateConfirmUser(updateConfirmUserDto)

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
