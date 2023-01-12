import type { IUser } from '@/domain/protocols/user'
import type { UpdateConfirmUserDto } from '@/main/dtos/user'
import { MissingMandatoryParamError } from '@/presentation/errors'
import { noContent, serverError } from '@/presentation/http-helper'
import type { IController } from '@/presentation/protocols/controller'
import type { IHttpResponse } from '@/presentation/protocols/http'

export class UpdateConfirmUserController implements IController {
  constructor (
    private readonly user: IUser
  ) {}

  async handle (updateConfirmUserDto: UpdateConfirmUserDto): Promise<IHttpResponse> {
    try {
      const { confirmUser } = updateConfirmUserDto
      if (!confirmUser) {
        return new MissingMandatoryParamError('confirmUser').serializeErrors()
      }
      await this.user.updateConfirmUser(updateConfirmUserDto)

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
