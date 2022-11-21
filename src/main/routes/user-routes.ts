
import { expressRouteAdapter } from '@/main/adapters/express-route-adapter'
import { signUpFactory, signInFactory } from '@/main/factories/user/user-factory'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/create', expressRouteAdapter(signUpFactory()))
  router.post('/sign-in', expressRouteAdapter(signInFactory()))
}
