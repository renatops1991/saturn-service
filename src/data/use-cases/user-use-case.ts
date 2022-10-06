import { User } from '../../domain/protocols/user/user'
import { CreateUserOutputDto } from '../../presentation/dtos/user/create-user-output.dto'
import { CreateUserDto } from '../../presentation/dtos/user/create-user.dto'
import { Encrypted } from '../protocols/encrypted'
import { UserRepository } from '../protocols/user-repository'

export class UserUseCase implements User {
  constructor (
    private readonly encrypted: Encrypted,
    private readonly userRepository: UserRepository
  ) {}

  async create (user: CreateUserDto): Promise<CreateUserOutputDto> {
    const hashedPassword = await this.encrypted.encrypt(user.password)
    await this.userRepository.create(Object.assign({}, user, { password: hashedPassword }))
    await this.userRepository.create(user)
    return null
  }
}
