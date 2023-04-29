import { EmailValidatorAdapter } from '@/infra/validators/email-validator-adapter'
import type { IValidation } from '@/presentation/protocols/validation'
import { CompareDate } from '@/validation/compare-date'
import { EmailValidation } from '@/validation/email-validation'
import { ValidationComposite } from '@/validation/validation-composite'

export const makeGetAllUsersValidationCompositeFactory = (): ValidationComposite => {
  const validations: IValidation[] = []

  validations.push(
    new EmailValidation('email', new EmailValidatorAdapter())
  )

  validations.push(
    new CompareDate('startDate', 'endDate')
  )

  return new ValidationComposite(validations)
}
