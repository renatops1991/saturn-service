import { User } from '@/data/use-cases/user'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter'
import { UserRepositoryMongoAdapter } from '@/infra/mongodb/user-repository-mongo-adapter'
import { SignUpUserController } from '@/presentation/controllers/user/signup-user-controller'
import { IController } from '@/presentation/protocols/controller'
import { makeSignUpValidationCompositeFactory } from '@/main/factories/validations/signup-validation-composite-factory'
import { SignInUserController } from '@/presentation/controllers/user/signin-user-controller'
import { makeSignInValidationCompositeFactory } from '../validations/signin-validation-composite-factory'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter'

export const signUpFactory = (): IController => {
  const user = new User(new BcryptAdapter(12), new JwtAdapter(''), new UserRepositoryMongoAdapter())
  return new SignUpUserController(user, makeSignUpValidationCompositeFactory())
}

export const signInFactory = (): IController => {
  const authentication = new User(
    new BcryptAdapter(12),
    new JwtAdapter(''),
    new UserRepositoryMongoAdapter())
  return new SignInUserController(makeSignInValidationCompositeFactory(), authentication)
}
