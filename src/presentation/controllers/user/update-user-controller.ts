import { IUser } from '@/domain/protocols/user'
import { UpdateUserDto } from '@/main/dtos/user/update-user.dto'
import { badRequest } from '@/presentation/http-helper'
import { IController } from '@/presentation/protocols/controller'
import { IHttpResponse } from '@/presentation/protocols/http'
import { IValidation } from '@/presentation/protocols/validation'

export class UpdateUserController implements IController {
  constructor (
    private readonly user: IUser,
    private readonly validation: IValidation
  ) {}

  async handle (updateUserDto: UpdateUserDto): Promise<IHttpResponse> {
    const isError = this.validation.validate(updateUserDto)
    if (isError) {
      return badRequest(isError)
    }

    await this.user.update(updateUserDto)
    return null
  }
}
