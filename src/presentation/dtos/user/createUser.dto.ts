
export interface CreateUserDto {
  name: string
  email: string
  password: string
  passwordConfirmation: string
  confirmUser?: boolean
}
