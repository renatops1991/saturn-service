import { ErrorsTypeEnum } from '@/presentation/enum/errors-type-enum'
import { CustomError } from './custom-error'

export class InvalidDateError extends CustomError {
  constructor (public field: string) {
    super(field)
    Object.setPrototypeOf(this, InvalidDateError.prototype)
  }

  serializeErrors (): any {
    return {
      type: ErrorsTypeEnum.INVALID_DATE_ERROR,
      field: this.field,
      message: 'startDate field cannot greater than endDate field'
    }
  }
}
