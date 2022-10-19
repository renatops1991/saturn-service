
import { expressRouteAdapter } from '@/main/adapters/express-route-adapter'
import { signupUserFactory } from '@/main/factories/user/signup-user-factory'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/create', expressRouteAdapter(signupUserFactory()))
}
