import { ErrorsTypeEnum } from '@/presentation/enum/errors-type-enum'
import { CustomError } from './custom-error'
export class ServerError extends CustomError {
  constructor (public stack: string) {
    super(stack)
    Object.setPrototypeOf(this, ServerError.prototype)
  }

  serializeErrors (): any {
    return {
      alias: ErrorsTypeEnum.SERVER_ERROR,
      message: 'Internal Server Error',
      stack: this.stack,
      timestamp: new Date()
    }
  }
}
