import { ErrorsTypeEnum } from '@/presentation/enum/errors-type-enum'
import { CustomError } from './custom-error'

export class EmailInUseError extends CustomError {
  constructor () {
    super('The received email is already in use')
    Object.setPrototypeOf(this, EmailInUseError.prototype)
  }

  serializeErrors (): any {
    return {
      alias: ErrorsTypeEnum.EMAIL_IS_ALREADY_USE,
      message: 'The received email is already in use',
      timestamp: new Date()
    }
  }
}
