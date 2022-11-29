import { expressRouteAdapter } from '@/main/adapters/express-route-adapter'
import { signUpFactory, signInFactory, updateConfirmUserFactory } from '@/main/factories/user-factory'
import { Router } from 'express'
import { authUser } from '@/main/middlewares'

export default (router: Router): void => {
  router.post('/sign-up', expressRouteAdapter(signUpFactory()))
  router.post('/sign-in', expressRouteAdapter(signInFactory()))
  router.put('/users/confirm', authUser, expressRouteAdapter(updateConfirmUserFactory()))
}
