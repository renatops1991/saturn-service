import type { IUser } from '@/domain/protocols/user'
import type { IController } from '@/presentation/protocols/controller'
import type { IHttpResponse } from '@/presentation/protocols/http'
import type { IValidation } from '@/presentation/protocols/validation'
import type { UpdateUserPasswordDto } from '@/main/dtos/user'
import { badRequest, noContent, serverError } from '@/presentation/http-helper'

export class UpdateUserPasswordController implements IController {
  constructor (
    private readonly user: IUser,
    private readonly validation: IValidation
  ) {}

  async handle (redefineUserPasswordDto: UpdateUserPasswordDto): Promise<IHttpResponse> {
    try {
      const isError = this.validation.validate(redefineUserPasswordDto)
      if (isError) {
        return badRequest(isError)
      }

      await this.user.updateUserPassword(redefineUserPasswordDto)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
