import { EmailValidatorAdapter } from '@/infra/validators/email-validator-adapter'
import { IValidation } from '@/presentation/protocols/validation'
import { CompareField } from '@/validation/compare-field'
import { EmailValidation } from '@/validation/email-validation'
import { RequiredField } from '@/validation/required-field'
import { ValidationComposite } from '@/validation/validation-composite'

export const makeSignUpValidationCompositeFactory = (): ValidationComposite => {
  const validations: IValidation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredField(field))
  }
  validations.push(
    new CompareField('password', 'passwordConfirmation')
  )
  validations.push(
    new EmailValidation('email', new EmailValidatorAdapter())
  )
  return new ValidationComposite(validations)
}
