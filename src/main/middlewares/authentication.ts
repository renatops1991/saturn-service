import { expressMiddlewareAdapter } from '@/main/adapters/express-middleware-adapter'
import { authMiddlewareFactory } from '@/main/factories/auth-middleware-factory'

export const authUser = expressMiddlewareAdapter(authMiddlewareFactory())
export const authAdmin = expressMiddlewareAdapter(authMiddlewareFactory('admin'))
