import type { IUser } from '@/domain/protocols/user'
import type { GetUserDto } from '@/main/dtos/user'
import { serverError, success } from '@/presentation/http-helper'
import type { IController } from '@/presentation/protocols/controller'
import type { IHttpResponse } from '@/presentation/protocols/http'

export class GetUserController implements IController {
  constructor (
    private readonly user: IUser
  ) {}

  async handle (getUserDto: GetUserDto): Promise<IHttpResponse> {
    try {
      const { userId } = getUserDto
      const user = await this.user.getUser(userId)
      return success(user)
    } catch (error) {
      return serverError(error)
    }
  }
}
