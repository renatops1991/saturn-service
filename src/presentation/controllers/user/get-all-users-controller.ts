import { IUser } from '@/domain/protocols/user'
import { Controller } from '@/main/decorators/controller.decorator'
import { FilterUserDto } from '@/main/dtos/user'
import { Get } from '@/main/factories/controller-factory'
import { badRequest, serverError, success } from '@/presentation/http-helper'
import type { IController } from '@/presentation/protocols/controller'
import type { IHttpResponse } from '@/presentation/protocols/http'
import { IValidation } from '@/presentation/protocols/validation'

@Controller('/users')
export class GetAllUsersController implements IController {
  constructor (
    private readonly user: IUser,
    private readonly validation: IValidation
  ) { }

  @Get('')
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
