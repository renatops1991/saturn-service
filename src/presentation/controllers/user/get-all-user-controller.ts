import { IUser } from '@/domain/protocols/user'
import { GetUserDto } from '@/main/dtos/user'
import { badRequest, serverError, success } from '@/presentation/http-helper'
import { IController } from '@/presentation/protocols/controller'
import { IHttpResponse } from '@/presentation/protocols/http'
import { IValidation } from '@/presentation/protocols/validation'

export class GetAllUserController implements IController {
  constructor (
    private readonly user: IUser,
    private readonly validation: IValidation
  ) { }

  async handle (getUserDto: GetUserDto): Promise<IHttpResponse> {
    try {
      const isError = this.validation.validate(getUserDto)
      if (isError) {
        return badRequest(isError)
      }

      const users = await this.user.getAllUsers(getUserDto)
      return success(users)
    } catch (error) {
      return serverError(error)
    }
  }
}
