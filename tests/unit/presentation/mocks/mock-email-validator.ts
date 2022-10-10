import { EmailValidator } from '@/presentation/protocols/email-validator'

export const mockEmailValidator = (): EmailValidator => {
  class EmailValidatorStub {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}
