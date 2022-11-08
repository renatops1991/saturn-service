import { IValidation } from '@/presentation/protocols/validation'
import { CompareField } from '@/presentation/validation/compare-field'
import { RequiredField } from '@/presentation/validation/required-field'
import { ValidationComposite } from '@/presentation/validation/validation-composite'

export const makeValidationCompositeFactory = (): ValidationComposite => {
  const validations: IValidation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredField(field))
  }
  validations.push(
    new CompareField('password', 'passwordConfirmation')
  )
  return new ValidationComposite(validations)
}
