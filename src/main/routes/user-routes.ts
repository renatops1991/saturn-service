import { expressRouteAdapter } from '@/main/adapters/express-route-adapter'
import { signUpFactory, signInFactory, updateConfirmUserFactory } from '@/main/factories/user-factory'
import { Router } from 'express'
import { expressMiddlewareAdapter } from '../adapters/express-middleware-adapter'
import { authMiddlewareFactory } from '../factories/auth-middleware-factory'

export default (router: Router): void => {
  router.post('/sign-up', expressRouteAdapter(signUpFactory()))
  router.post('/sign-in', expressRouteAdapter(signInFactory()))
  router.put('/users/confirm', expressMiddlewareAdapter(authMiddlewareFactory()), expressRouteAdapter(updateConfirmUserFactory()))
}
