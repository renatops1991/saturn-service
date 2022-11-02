import { ErrorsTypeEnum } from '@/presentation/enum/errors-type-enum'
import { CustomError } from './custom-error'

export class UnauthorizedError extends CustomError {
  constructor () {
    super('Unauthorized error')
    Object.setPrototypeOf(this, UnauthorizedError.prototype)
  }

  serializeErrors (): any {
    return {
      type: ErrorsTypeEnum.UNAUTHORIZED_ERROR,
      message: 'Unauthorized error'
    }
  }
}
