import { User } from '../../domain/protocols/user/user'
import { CreateUserOutputDto } from '../../presentation/dtos/user/create-user-output.dto'
import { CreateUserDto } from '../../presentation/dtos/user/create-user.dto'
import { UserBuilder } from '../builders/user-builder'
import { Encrypted } from '../protocols/encrypted'
import { UserRepository } from '../protocols/user-repository'

export class UserUseCase implements User {
  constructor (
    private readonly encrypted: Encrypted,
    private readonly userRepository: UserRepository,
    private readonly userBuilder: UserBuilder
  ) { }

  async create (userDto: CreateUserDto): Promise<CreateUserOutputDto> {
    const buildUser = this.userBuilder.buildUserBasicInfo(userDto)
    const hashedPassword = await this.encrypted.encrypt(buildUser.password)
    const user = await this.userRepository.create(Object.assign({}, buildUser, { password: hashedPassword }))

    return user
  }
}
