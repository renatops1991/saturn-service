import { IUser } from '@/domain/protocols/user'
import { GetUserDto } from '@/main/dtos/user'
import { success } from '@/presentation/http-helper'
import { IController } from '@/presentation/protocols/controller'
import { IHttpResponse } from '@/presentation/protocols/http'

export class GetAllUserController implements IController {
  constructor (private readonly user: IUser) {}

  async handle (getUserDto: GetUserDto): Promise<IHttpResponse> {
    const users = await this.user.getAllUsers(getUserDto)
    return success(users)
  }
}
