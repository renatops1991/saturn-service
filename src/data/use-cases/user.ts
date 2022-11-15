import { IUser } from '@/domain/protocols/user'
import { UserOutputDto } from '@/presentation/dtos/user/user-output.dto'
import { CreateUserDto } from '@/presentation/dtos/user/create-user.dto'
import { UserBuilder } from '@/data/builders/user-builder'
import { IEncrypted } from '@/data/protocols/encrypted'
import { IUserRepository } from '@/data/protocols/user-repository'
import { IAuthentication } from '@/domain/protocols/authentication'
import { LoginUserOutputDto } from '@/presentation/dtos/user/login-user-output.dto'
import { LoginUserDto } from '@/presentation/dtos/user/login-user.dto'

export class User implements IUser, IAuthentication {
  constructor (
    private readonly encrypted: IEncrypted,
    private readonly userRepository: IUserRepository
  ) { }

  async create (userDto: Omit<CreateUserDto, 'passwordConfirmation'>): Promise<UserOutputDto> {
    const hashedPassword = await this.encrypted.encrypt(userDto.password)
    const userBuilder = new UserBuilder()
    const buildUser = userBuilder.buildUserBasicInfo(Object.assign({}, userDto, { password: hashedPassword }))
    const user = await this.userRepository.create(buildUser)

    return user
  }

  async auth (loginUserDto: LoginUserDto): Promise<LoginUserOutputDto> {
    await this.userRepository.loadByEmail(loginUserDto.email)
    return null
  }
}
