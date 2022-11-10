import { EmailValidatorAdapter } from '@/infra/validators/email-validator-adapter'
import { IValidation } from '@/presentation/protocols/validation'
import { EmailValidation } from '@/validation/email-validation'
import { RequiredField } from '@/validation/required-field'
import { ValidationComposite } from '@/validation/validation-composite'

export const makeLoginValidationCompositeFactory = (): ValidationComposite => {
  const validations: IValidation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredField(field))
  }
  validations.push(
    new EmailValidation('email', new EmailValidatorAdapter())
  )
  return new ValidationComposite(validations)
}
