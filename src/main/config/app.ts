import setupMiddleware from '@/main/config/middleware'
import setupRoutes from '@/main/config/routes'
import { controllers } from '@/presentation/controllers/user/controller'
import express, { type Express } from 'express'
import { MetadataKeys } from '../enum/metadata-keys'
import { type IRouter } from '../factories/controller-factory'
import { makeGetAllUsersValidationCompositeFactory } from '../factories/validations'
import { User } from '@/data/use-cases/user'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter'
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter'
import { UserRepositoryMongoAdapter } from '@/infra/mongodb/user-repository-mongo-adapter'
import { expressRouteAdapter } from '../adapters/express-route-adapter'
import { Router } from 'express'
import { authAdmin } from '../middlewares'
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET_TOKEN = process.env.JWT_SECRET as string

export const setupApp = async (): Promise<Express> => {
  const app = express()
  setupMiddleware(app)

  const user = new User(
    new BcryptAdapter(12),
    new JwtAdapter(JWT_SECRET_TOKEN),
    new UserRepositoryMongoAdapter()
  )

  controllers.forEach((ControllerClass) => {
    const controllerInstance = new ControllerClass(user, makeGetAllUsersValidationCompositeFactory())

    const basePath: string = Reflect.getMetadata(MetadataKeys.BASE_PATH, ControllerClass)
    const routers: IRouter[] = Reflect.getMetadata(MetadataKeys.ROUTERS, ControllerClass)

    const router = Router()

    routers.forEach(({ method, path }) => {
      router[method](path, authAdmin, expressRouteAdapter(controllerInstance))
    })

    app.use(basePath, router)
  })

  setupRoutes(app)

  return app
}
