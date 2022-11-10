import { User } from '@/data/use-cases/user'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter'
import { UserRepositoryMongoAdapter } from '@/infra/mongodb/user-repository-mongo-adapter'
import { SignUpUserController } from '@/presentation/controllers/user/signup-user-controller'
import { IController } from '@/presentation/protocols/controller'
import { makeSignUpValidationCompositeFactory } from '@/main/factories/validations/signup-validation-composite-factory'

export const signupUserFactory = (): IController => {
  const user = new User(new BcryptAdapter(12), new UserRepositoryMongoAdapter())
  return new SignUpUserController(user, makeSignUpValidationCompositeFactory())
}
