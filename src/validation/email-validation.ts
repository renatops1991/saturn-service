import type { IEmailValidator } from '@/validation/protocols/email-validator'
import type { IValidation } from '@/presentation/protocols/validation'
import { InvalidParamError } from '@/presentation/errors'

export class EmailValidation implements IValidation {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: IEmailValidator
  ) {}

  validate (input: any): Error | null {
    if (!input[this.fieldName]) {
      return null
    }

    const isValidEmail = this.emailValidator.isValid(input[this.fieldName])
    if (!isValidEmail) {
      return new InvalidParamError(this.fieldName).serializeErrors()
    }
    return null
  }
}
