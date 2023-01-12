import type { IUser } from '@/domain/protocols/user'
import type { FilterUserDto } from '@/main/dtos/user'
import { badRequest, serverError, success } from '@/presentation/http-helper'
import type { IController } from '@/presentation/protocols/controller'
import type { IHttpResponse } from '@/presentation/protocols/http'
import type { IValidation } from '@/presentation/protocols/validation'

export class GetAllUsersController implements IController {
  constructor (
    private readonly user: IUser,
    private readonly validation: IValidation
  ) { }

  async handle (filterUserDto: FilterUserDto): Promise<IHttpResponse> {
    try {
      const isError = this.validation.validate(filterUserDto)
      if (isError) {
        return badRequest(isError)
      }

      const users = await this.user.getAllUsers(filterUserDto)
      return success(users)
    } catch (error) {
      return serverError(error)
    }
  }
}
