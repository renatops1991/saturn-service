import { UserOutputDto, SignInUserDto, LoadUserDto } from '@/main/dtos/user'

export interface IAuthentication {
  auth: (signInUserDto: SignInUserDto) => Promise<UserOutputDto>
  loadUserByToken: (accessToken: string, role?: string) => Promise<Partial<LoadUserDto>>
}
