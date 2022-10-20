import { User } from '@/domain/use-cases/user'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter'
import { UserRepositoryMongoAdapter } from '@/infra/mongodb/user-repository-mongo-adapter'
import { SignUpUserController } from '@/presentation/controllers/signup-user-controller'
import { IController } from '@/presentation/protocols/controller'
import { EmailValidatorAdapter } from '@/presentation/validation/email-validator-adapter'

export const signupUserFactory = (): IController => {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const user = new User(new BcryptAdapter(12), new UserRepositoryMongoAdapter())
  return new SignUpUserController(emailValidatorAdapter, user)
}
