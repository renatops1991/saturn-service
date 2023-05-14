import { ErrorsTypeEnum } from '@/presentation/enum/errors-type-enum'
import { CustomError } from './custom-error'

export class MissingMandatoryParamError extends CustomError {
  constructor (public field: string) {
    super(field)
    Object.setPrototypeOf(this, MissingMandatoryParamError.prototype)
  }

  serializeErrors (): any {
    return {
      alias: ErrorsTypeEnum.MISSING_MANDATORY_PARAM_ERROR,
      errors: [
        {
          field: this.field,
          message: 'Missing mandatory parameter'
        }
      ],
      message: 'Missing mandatory parameter',
      timestamp: new Date()
    }
  }
}
