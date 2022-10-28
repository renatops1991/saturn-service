import { ErrorsTypeEnum } from '../enum/errors-type-enum'
import { CustomError } from './custom-error'

export class InvalidParamError extends CustomError {
  constructor (public field: string) {
    super(field)
    Object.setPrototypeOf(this, InvalidParamError.prototype)
  }

  serializeErrors (): any {
    return {
      type: ErrorsTypeEnum.INVALID_PARAM_ERROR,
      field: this.field,
      message: 'Invalid param error'
    }
  }
}
