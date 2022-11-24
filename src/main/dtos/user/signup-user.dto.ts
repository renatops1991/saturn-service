
export interface SignUpUserDto {
  name: string
  email: string
  password: string
  passwordConfirmation: string
  confirmUser?: boolean
  createdAt?: Date
  updatedAt?: Date
}
