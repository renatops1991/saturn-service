import type { UserOutputDto, SignInUserDto, LoadUserDto } from '@/main/dtos/user'

export interface IAuthentication {
  auth: (signInUserDto: SignInUserDto) => Promise<UserOutputDto | null>
  loadByToken: (accessToken: string, role?: string) => Promise<LoadUserDto | null>
}
