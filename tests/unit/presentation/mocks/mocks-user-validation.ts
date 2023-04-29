import type { IEmailValidator } from '@/validation/protocols/email-validator'
import type { IValidation } from '@/presentation/protocols/validation'

export const mockEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

export const mockValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}
