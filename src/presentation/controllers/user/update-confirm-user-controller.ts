import { IUser } from '@/domain/protocols/user'
import { UpdateConfirmUserDto } from '@/main/dtos/user'
import { MissingMandatoryParamError } from '@/presentation/errors'
import { noContent, serverError } from '@/presentation/http-helper'
import { IController } from '@/presentation/protocols/controller'
import { IHttpResponse } from '@/presentation/protocols/http'

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
