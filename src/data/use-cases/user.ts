import { IUser } from '@/domain/protocols/user'
import { IAuthentication } from '@/domain/protocols/authentication'
import { UserBuilder } from '@/data/builders/user-builder'
import { IHashed } from '@/data/protocols/hashed'
import { IUserRepository } from '@/data/protocols/user-repository'
import { ICryptography } from '@/data/protocols/cryptography'
import {
  SignUpUserDto,
  UserOutputDto,
  SignInUserDto,
  LoadUserDto
} from '@/main/dtos/user'

export class User implements IUser, IAuthentication {
  constructor (
    private readonly hashed: IHashed,
    private readonly cryptography: ICryptography,
    private readonly userRepository: IUserRepository
  ) { }

  async create (userDto: Omit<SignUpUserDto, 'passwordConfirmation'>): Promise<UserOutputDto> {
    const isEmailInUse = await this.userRepository.loadByEmail(userDto.email)
    if (isEmailInUse !== null) {
      return null
    }
    const hashedPassword = await this.hashed.hash(userDto.password)
    const userBuilder = new UserBuilder()
    const buildUser = userBuilder.buildUserBasicInfo(Object.assign({}, userDto, { password: hashedPassword }))
    const user = await this.userRepository.create(buildUser)

    return user
  }

  async auth (signInUserDto: SignInUserDto): Promise<UserOutputDto> {
    const user = await this.userRepository.loadByEmail(signInUserDto.email)
    if (!user) {
      return null
    }
    const isValidPassword = await this.hashed.compare(signInUserDto.password, user.password)
    if (!isValidPassword) {
      return null
    }
    const accessToken = await this.cryptography.encrypt(user.id)
    await this.userRepository.updateAccessToken(user.id, accessToken)

    return {
      name: user.name,
      email: user.email,
      accessToken
    }
  }

  async loadUserByToken (accessToken: string, role?: string): Promise<Partial<LoadUserDto>> {
    await this.cryptography.decrypt(accessToken)
    const user = await this.userRepository.loadByToken(accessToken, role)
    if (!user) {
      return null
    }

    return user
  }
}
