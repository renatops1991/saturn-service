import { User } from '../../domain/protocols/user/user'
import { CreateUserOutputDto } from '../../presentation/dtos/user/create-user-output.dto'
import { CreateUserDto } from '../../presentation/dtos/user/create-user.dto'
import { Encrypted } from '../protocols/encrypted'

export class UserUseCase implements User {
  constructor (
    private readonly encrypted: Encrypted
  ) {}

  async create (user: CreateUserDto): Promise<CreateUserOutputDto> {
    await this.encrypted.encrypt(user.password)
    return null
  }
}
