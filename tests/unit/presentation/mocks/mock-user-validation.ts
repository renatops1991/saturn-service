import { IEmailValidator } from '@/presentation/protocols/email-validator'
import { IValidation } from '@/presentation/protocols/validation'

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
