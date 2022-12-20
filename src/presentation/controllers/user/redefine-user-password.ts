import { IUser } from '@/domain/protocols/user'
import { IController } from '@/presentation/protocols/controller'
import { IHttpResponse } from '@/presentation/protocols/http'
import { IValidation } from '@/presentation/protocols/validation'
import { RedefineUserPasswordDto } from '@/main/dtos/user'

export class RedefineUserPassword implements IController {
  constructor (
    private readonly user: IUser,
    private readonly validation: IValidation
  ) {}

  async handle (redefineUserPasswordDto: RedefineUserPasswordDto): Promise<IHttpResponse> {
    this.validation.validate(redefineUserPasswordDto)
    return null
  }
}
