import { User } from '@/domain/use-cases/user'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter'
import { UserRepositoryMongoAdapter } from '@/infra/mongodb/user-repository-mongo-adapter'
import { SignUpUserController } from '@/presentation/controllers/user/signup-user-controller'
import { IController } from '@/presentation/protocols/controller'
import { EmailValidatorAdapter } from '@/presentation/validation/email-validator-adapter'
import { makeValidationCompositeFactory } from '../validation/validation-composite-factory'

export const signupUserFactory = (): IController => {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const user = new User(new BcryptAdapter(12), new UserRepositoryMongoAdapter())
  return new SignUpUserController(emailValidatorAdapter, user, makeValidationCompositeFactory())
}
