import { EmailValidator } from '../../../../src/presentation/protocols/email-validator'

export const mockEmailValidator = (): EmailValidator => {
  class EmailValidatorStub {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

export const mockEmailValidatorWithError = (): EmailValidator => {
  class EmailValidatorStub {
    isValid (email: string): boolean {
      throw new Error()
    }
  }

  return new EmailValidatorStub()
}
