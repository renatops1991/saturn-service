import { expressRouteAdapter } from '@/main/adapters/express-route-adapter'
import {
  signUpFactory,
  signInFactory,
  updateConfirmUserFactory,
  updateUserFactory,
  updateUserPasswordFactory,
  getUserFactory,
  getAllUsersFactory
} from '@/main/factories/user-factory'
import { authAdmin, authUser } from '@/main/middlewares'
import type { Router } from 'express'

export default (router: Router): void => {
  router.post('/sign-up', expressRouteAdapter(signUpFactory()))
  router.post('/sign-in', expressRouteAdapter(signInFactory()))
  router.put('/user', authUser, expressRouteAdapter(updateUserFactory()))
  router.get('/user', authUser, expressRouteAdapter(getUserFactory()))
  router.get('/users', authAdmin, expressRouteAdapter(getAllUsersFactory()))
  router.patch('/user/confirm', authUser, expressRouteAdapter(updateConfirmUserFactory()))
  router.patch('/user/redefine-password', authUser, expressRouteAdapter(updateUserPasswordFactory()))
}
