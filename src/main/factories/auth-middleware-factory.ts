import { User } from '@/data/use-cases/user'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter'
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter'
import { UserRepositoryMongoAdapter } from '@/infra/mongodb/user-repository-mongo-adapter'
import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'
import type { IMiddleware } from '@/presentation/protocols/middleware'
import dotenv from 'dotenv'

dotenv.config()

export const authMiddlewareFactory = (role?: string): IMiddleware => {
  const authentication = new User(
    new BcryptAdapter(12),
    new JwtAdapter(process.env.JWT_SECRET as string),
    new UserRepositoryMongoAdapter()
  )
  return new AuthMiddleware(authentication, role)
}
