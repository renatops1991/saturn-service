import { ErrorsTypeEnum } from '@/presentation/enum/errors-type-enum'
import { CustomError } from './custom-error'

export class InvalidParamError extends CustomError {
  constructor (public field: string) {
    super(field)
    Object.setPrototypeOf(this, InvalidParamError.prototype)
  }

  serializeErrors (): any {
    return {
      alias: ErrorsTypeEnum.INVALID_PARAM_ERROR,
      errors: [
        {
          field: this.field,
          message: 'Invalid param error'
        }
      ],
      message: 'Invalid param error',
      timestamp: new Date()
    }
  }
}
