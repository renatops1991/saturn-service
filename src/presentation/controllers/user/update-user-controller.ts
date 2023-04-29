import type { IUser } from '@/domain/protocols/user'
import type { UpdateUserDto } from '@/main/dtos/user/update-user.dto'
import { badRequest, serverError, success } from '@/presentation/http-helper'
import type { IController } from '@/presentation/protocols/controller'
import type { IHttpResponse } from '@/presentation/protocols/http'
import type { IValidation } from '@/presentation/protocols/validation'

export class UpdateUserController implements IController {
  constructor (
    private readonly user: IUser,
    private readonly validation: IValidation
  ) {}

  async handle (updateUserDto: UpdateUserDto): Promise<IHttpResponse> {
    try {
      const isError = this.validation.validate(updateUserDto)
      if (isError) {
        return badRequest(isError)
      }

      const updatedUser = await this.user.update(updateUserDto)
      return success(updatedUser)
    } catch (error) {
      return serverError(error)
    }
  }
}
