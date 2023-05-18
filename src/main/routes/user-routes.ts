import { expressRouteAdapter } from '@/main/adapters/express-route-adapter'
import {
  signUpFactory,
  signInFactory,
  updateConfirmUserFactory,
  updateUserFactory,
  updateUserPasswordFactory,
  getUserFactory
} from '@/main/factories/user-factory'
import { authUser } from '@/main/middlewares'
import type { Router } from 'express'

export default (router: Router): void => {
  router.post('/sign-up', expressRouteAdapter(signUpFactory()))
  router.post('/sign-in', expressRouteAdapter(signInFactory()))
  router.put('/user', authUser, expressRouteAdapter(updateUserFactory()))
  router.get('/user', authUser, expressRouteAdapter(getUserFactory()))
  router.patch('/user/confirm', authUser, expressRouteAdapter(updateConfirmUserFactory()))
  router.patch('/user/redefine-password', authUser, expressRouteAdapter(updateUserPasswordFactory()))
}
