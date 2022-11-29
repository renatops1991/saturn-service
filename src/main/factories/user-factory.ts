import { User } from '@/data/use-cases/user'
import { SignUpUserController } from '@/presentation/controllers/user/signup-user-controller'
import { IController } from '@/presentation/protocols/controller'
import { SignInUserController } from '@/presentation/controllers/user/signin-user-controller'
import { makeSignUpValidationCompositeFactory } from '@/main/factories/validations/signup-validation-composite-factory'
import { makeSignInValidationCompositeFactory } from '@/main/factories/validations/signin-validation-composite-factory'
import { UserRepositoryMongoAdapter } from '@/infra/mongodb/user-repository-mongo-adapter'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter'
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter'
import dotenv from 'dotenv'
import { UpdateConfirmUserController } from '@/presentation/controllers/user/update-confirm-user-controller'

dotenv.config()
export const signUpFactory = (): IController => {
  const user = new User(
    new BcryptAdapter(12),
    new JwtAdapter(process.env.JWT_SECRET),
    new UserRepositoryMongoAdapter()
  )
  return new SignUpUserController(user, makeSignUpValidationCompositeFactory(), user)
}

export const signInFactory = (): IController => {
  const authentication = new User(
    new BcryptAdapter(12),
    new JwtAdapter(process.env.JWT_SECRET),
    new UserRepositoryMongoAdapter()
  )
  return new SignInUserController(authentication, makeSignInValidationCompositeFactory())
}

export const updateConfirmUserFactory = (): IController => {
  const user = new User(
    new BcryptAdapter(12),
    new JwtAdapter(process.env.JWT_SECRET),
    new UserRepositoryMongoAdapter()
  )
  return new UpdateConfirmUserController(user)
}
