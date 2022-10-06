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

  async create (userDto: CreateUserDto): Promise<CreateUserOutputDto> {
    const hashedPassword = await this.encrypted.encrypt(userDto.password)
    await this.userRepository.create(Object.assign({}, userDto, { password: hashedPassword }))
    const user = await this.userRepository.create(userDto)

    return user
  }
}
