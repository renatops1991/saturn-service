import { UserOutputDto, SignInUserDto, LoadUserDto } from '@/main/dtos/user'

export interface IAuthentication {
  auth: (signInUserDto: SignInUserDto) => Promise<UserOutputDto>
  loadByToken: (accessToken: string, role?: string) => Promise<LoadUserDto>
}
