import { IEmailValidator } from '@/presentation/protocols/email-validator'

export const mockEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}
