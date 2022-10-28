import { ErrorsTypeEnum } from '../enum/errors-type-enum'
import { CustomError } from './custom-error'

export class MissingMandatoryParamError extends CustomError {
  constructor (public field: string) {
    super(field)
    Object.setPrototypeOf(this, MissingMandatoryParamError.prototype)
  }

  serializeErrors (): any {
    return {
      type: ErrorsTypeEnum.MISSING_MANDATORY_PARAM_ERROR,
      field: this.field,
      message: 'Missing mandatory parameter'
    }
  }
}
