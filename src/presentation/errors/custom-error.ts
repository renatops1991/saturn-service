import type { ErrorsTypeEnum } from '@/presentation/enum/errors-type-enum'

export abstract class CustomError extends Error {
  stack?: string
  constructor (message: string) {
    super(message)
    Object.setPrototypeOf(this, CustomError.prototype)
  }

  abstract serializeErrors (): {
    alias: ErrorsTypeEnum
    errors?: Record<string, string>
    message: string
    stack?: any
    timestamp: Date
  }
}
