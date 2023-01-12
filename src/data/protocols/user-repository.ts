import type {
  SignUpUserDto,
  LoadUserDto,
  UserOutputDto,
  UpdateConfirmUserDto,
  UpdateUserOutputDto,
  UpdateUserDto,
  UpdateUserPasswordDto,
  GetUserOutputDto,
  FilterUserDto
} from '@/main/dtos/user'

export interface IUserRepository {
  create: (userDto: Omit<SignUpUserDto, 'passwordConfirmation'>) => Promise<UserOutputDto>
  loadByEmail: (email: string) => Promise<LoadUserDto | null>
  loadByToken: (accessToken: string, role?: string) => Promise<LoadUserDto | null>
  updateAccessToken: (userId: string, token: string) => Promise<void>
  updateConfirmUser: (updateConfirmUserDto: UpdateConfirmUserDto) => Promise<void>
  update: (updateUserDto: UpdateUserDto) => Promise<UpdateUserOutputDto>
  updateUserPassword: (updateUserPasswordDto: Omit<UpdateUserPasswordDto, 'passwordConfirmation'>) => Promise<void>
  getUser: (userId: string) => Promise<GetUserOutputDto | null>
  getAllUsers: (filterUserDto: FilterUserDto) => Promise<GetUserOutputDto[]>
}
