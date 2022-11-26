import { ErrorsTypeEnum } from '@/presentation/enum/errors-type-enum'
import { CustomError } from './custom-error'

export class AccessDeniedError extends CustomError {
  constructor () {
    super('Access not allowed, please authenticate before accessing the route')
    Object.setPrototypeOf(this, AccessDeniedError.prototype)
  }

  serializeErrors (): any {
    return {
      type: ErrorsTypeEnum.ACCESS_DENIED_ERROR,
      message: 'Access not allowed, please authenticate before accessing the route'
    }
  }
}
