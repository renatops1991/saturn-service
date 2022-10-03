import { EmailValidator } from '../../../../src/presentation/protocols/email-validator'

export const mockEmailValidator = (): EmailValidator => {
  class EmailValidatorStub {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}
