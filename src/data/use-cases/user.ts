import { User as UserInterface } from '@/domain/user/user'
import { CreateUserOutputDto } from '@/presentation/dtos/user/create-user-output.dto'
import { CreateUserDto } from '@/presentation/dtos/user/create-user.dto'
import { UserBuilder } from '@/data/builders/user-builder'
import { Encrypted } from '@/data/protocols/encrypted'
import { UserRepository } from '@/data/protocols/user-repository'

export class User implements UserInterface {
  constructor (
    private readonly encrypted: Encrypted,
    private readonly userRepository: UserRepository
  ) { }

  async create (userDto: Omit<CreateUserDto, 'passwordConfirmation'>): Promise<CreateUserOutputDto> {
    const hashedPassword = await this.encrypted.encrypt(userDto.password)
    const userBuilder = new UserBuilder()
    const buildUser = userBuilder.buildUserBasicInfo(Object.assign({}, userDto, { password: hashedPassword }))
    const user = await this.userRepository.create(buildUser)

    return user
  }
}
