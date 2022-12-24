import { IUser } from '@/domain/protocols/user'
import { serverError } from '@/presentation/http-helper'
import { IController } from '@/presentation/protocols/controller'
import { IHttpResponse } from '@/presentation/protocols/http'

export class GetUserController implements IController {
  constructor (
    private readonly user: IUser
  ) {}

  async handle (userId: string): Promise<IHttpResponse> {
    try {
      await this.user.getUser(userId)
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
