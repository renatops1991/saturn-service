import { ErrorsTypeEnum } from '@/presentation/enum/errors-type-enum'
import { CustomError } from './custom-error'

export class UnauthorizedError extends CustomError {
  constructor () {
    super('Email or password incorrect')
    Object.setPrototypeOf(this, UnauthorizedError.prototype)
  }

  serializeErrors (): any {
    return {
      alias: ErrorsTypeEnum.UNAUTHORIZED_ERROR,
      message: 'Email or password incorrect',
      timestamp: new Date()
    }
  }
}
