import { IEmailValidator } from '@/presentation/protocols/email-validator'
import { IValidation } from '@/presentation/protocols/validation'
import { InvalidParamError } from '@/presentation/errors'

export class EmailValidation implements IValidation {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: IEmailValidator
  ) {}

  validate (input: any): Error | null {
    const isValidEmail = this.emailValidator.isValid(input[this.fieldName])
    if (!isValidEmail) {
      return new InvalidParamError(this.fieldName).serializeErrors()
    }
    return null
  }
}
