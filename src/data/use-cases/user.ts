import { IUser } from '@/domain/protocols/user'
import { IAuthentication } from '@/domain/protocols/authentication'
import {
  IUserBuilder,
  IHashed,
  IUserRepository,
  ICryptography
} from '@/data/protocols'
import { UserType } from '@/data/types'
import {
  SignUpUserDto,
  UserOutputDto,
  SignInUserDto,
  LoadUserDto,
  UpdateConfirmUserDto,
  UpdateUserOutputDto,
  UpdateUserDto,
  UpdateUserPasswordDto,
  GetUserOutputDto,
  FilterUserDto
} from '@/main/dtos/user'

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
    let updateUser: UserType

    if (!password) {
      updateUser = this.userBuilder.buildUser(updateUserDto)
    } else {
      const hashedPassword = await this.hashed.hash(password)
      updateUser = this.userBuilder.buildUser(Object.assign({}, updateUserDto, { password: hashedPassword }))
    }

    return await this.userRepository.update(updateUser)
  }

  async updateUserPassword (redefineUserPasswordDto: Omit<UpdateUserPasswordDto, 'passwordConfirmation'>): Promise<void> {
    const { password } = redefineUserPasswordDto
    const hashedPassword = await this.hashed.hash(password)
    await this.userRepository.updateUserPassword(
      Object.assign({}, redefineUserPasswordDto,
        {
          password: hashedPassword
        }
      ))
  }

  async getUser (userId: string): Promise<GetUserOutputDto> {
    return await this.userRepository.getUser(userId)
  }

  async getAllUsers (filterUserDto: FilterUserDto): Promise<GetUserOutputDto[]> {
    return await this.userRepository.getAllUsers(filterUserDto)
  }
}
