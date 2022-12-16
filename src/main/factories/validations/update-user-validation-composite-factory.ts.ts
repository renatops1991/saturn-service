import { IValidation } from '@/presentation/protocols/validation'
import { RequiredField } from '@/validation/required-field'
import { ValidationComposite } from '@/validation/validation-composite'
import { CompareField } from '@/validation/compare-field'

export const makeUpdateUserValidationCompositeFactory = (): ValidationComposite => {
  const validations: IValidation[] = []
  for (const field of ['document']) {
    validations.push(new RequiredField(field))
  }
  validations.push(
    new CompareField('password', 'passwordConfirmation')
  )
  return new ValidationComposite(validations)
}
