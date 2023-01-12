import type { ErrorsTypeEnum } from '@/presentation/enum/errors-type-enum'

export abstract class CustomError extends Error {
  stack?: string
  constructor (message: string) {
    super(message)
    Object.setPrototypeOf(this, CustomError.prototype)
  }

  abstract serializeErrors (): {
    type: ErrorsTypeEnum
    field?: string
    message: string
    stack?: any
  }
}
