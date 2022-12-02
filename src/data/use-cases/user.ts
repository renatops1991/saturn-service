import { IUser } from '@/domain/protocols/user'
import { IUserBuilder } from '@/data/protocols/user-builder'
import { IAuthentication } from '@/domain/protocols/authentication'
import { IHashed } from '@/data/protocols/hashed'
import { IUserRepository } from '@/data/protocols/user-repository'
import { ICryptography } from '@/data/protocols/cryptography'
import {
  SignUpUserDto,
  UserOutputDto,
  SignInUserDto,
  LoadUserDto,
  UpdateConfirmUserDto
} from '@/main/dtos/user'
import { UpdateUserOutputDto } from '@/main/dtos/user/update-user-output.dto'
import { UpdateUserDto } from '@/main/dtos/user/update-user.dto'

export class User implements IUser, IAuthentication {
  constructor (
    private readonly hashed: IHashed,
    private readonly cryptography: ICryptography,
    private readonly userRepository: IUserRepository,
    private readonly userBuilder?: IUserBuilder
  ) { }

  async create (userDto: Omit<SignUpUserDto, 'passwordConfirmation'>): Promise<UserOutputDto> {
    const isEmailInUse = await this.userRepository.loadByEmail(userDto.email)
    if (isEmailInUse !== null) {
      return null
    }
    const hashedPassword = await this.hashed.hash(userDto.password)
    const buildUser = this.userBuilder.buildUserBasicInfo(
      Object.assign({}, userDto, { password: hashedPassword })
    )
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

  async loadByToken (accessToken: string, role?: string): Promise<LoadUserDto> {
    const isValidAccessToken = await this.cryptography.decrypt(accessToken)
    if (!isValidAccessToken) {
      return null
    }

    const user = await this.userRepository.loadByToken(accessToken, role)
    if (!user) {
      return null
    }

    return user
  }

  async updateConfirmUser (updateConfirmUserDto: UpdateConfirmUserDto): Promise<void> {
    await this.userRepository.updateConfirmUser(updateConfirmUserDto)
  }

  async update (updateUserDto: UpdateUserDto): Promise<UpdateUserOutputDto> {
    const { password } = updateUserDto
    await this.hashed.hash(password)

    return null
  }
}
