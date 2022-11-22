import { User } from '@/data/use-cases/user'
import { SignUpUserController } from '@/presentation/controllers/user/signup-user-controller'
import { IController } from '@/presentation/protocols/controller'
import { SignInUserController } from '@/presentation/controllers/user/signin-user-controller'
import { makeSignUpValidationCompositeFactory } from '@/main/factories/validations/signup-validation-composite-factory'
import { makeSignInValidationCompositeFactory } from '@/main/factories/validations/signin-validation-composite-factory'
import { UserRepositoryMongoAdapter } from '@/infra/mongodb/user-repository-mongo-adapter'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter'
import dotenv from 'dotenv'

dotenv.config()
export const signUpFactory = (): IController => {
  const user = new User(
    new BcryptAdapter(12),
    new JwtAdapter(process.env.JWT_SECRET),
    new UserRepositoryMongoAdapter()
  )
  return new SignUpUserController(user, makeSignUpValidationCompositeFactory())
}

export const signInFactory = (): IController => {
  const authentication = new User(
    new BcryptAdapter(12),
    new JwtAdapter(process.env.JWT_SECRET),
    new UserRepositoryMongoAdapter()
  )
  return new SignInUserController(authentication, makeSignInValidationCompositeFactory())
}
