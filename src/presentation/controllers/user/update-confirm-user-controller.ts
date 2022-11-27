import { UpdateConfirmUserDto } from '@/main/dtos/user'
import { badRequest } from '@/presentation/http-helper'
import { IController } from '@/presentation/protocols/controller'
import { IHttpResponse } from '@/presentation/protocols/http'
import { IValidation } from '@/presentation/protocols/validation'

export class UpdateConfirmUserController implements IController {
  constructor (private readonly validation: IValidation) {}
  async handle (updateConfirmUser: UpdateConfirmUserDto): Promise<IHttpResponse> {
    const isError = this.validation.validate(updateConfirmUser)
    if (isError) {
      return badRequest(isError)
    }
  }
}
