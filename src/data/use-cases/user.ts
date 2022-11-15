import { IUser } from '@/domain/protocols/user'
import { UserOutputDto } from '@/presentation/dtos/user/user-output.dto'
import { CreateUserDto } from '@/presentation/dtos/user/create-user.dto'
import { UserBuilder } from '@/data/builders/user-builder'
import { ICryptography } from '@/data/protocols/cryptography'
import { IUserRepository } from '@/data/protocols/user-repository'
import { IAuthentication } from '@/domain/protocols/authentication'
import { LoginUserOutputDto } from '@/presentation/dtos/user/login-user-output.dto'
import { LoginUserDto } from '@/presentation/dtos/user/login-user.dto'

export class User implements IUser, IAuthentication {
  constructor (
    private readonly cryptography: ICryptography,
    private readonly userRepository: IUserRepository
  ) { }

  async create (userDto: Omit<CreateUserDto, 'passwordConfirmation'>): Promise<UserOutputDto> {
    const hashedPassword = await this.cryptography.encrypt(userDto.password)
    const userBuilder = new UserBuilder()
    const buildUser = userBuilder.buildUserBasicInfo(Object.assign({}, userDto, { password: hashedPassword }))
    const user = await this.userRepository.create(buildUser)

    return user
  }

  async auth (loginUserDto: LoginUserDto): Promise<LoginUserOutputDto> {
    const user = await this.userRepository.loadByEmail(loginUserDto.email)
    if (!user) {
      return null
    }
    const isValidPassword = await this.cryptography.compare(loginUserDto.password, user.password)
    if (!isValidPassword) {
      return null
    }
    const accessToken = await this.cryptography.encrypt(user.id)
    await this.userRepository.updateAccessToken(user.id, accessToken)
  }
}
