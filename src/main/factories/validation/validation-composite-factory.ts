import { IValidation } from '@/presentation/protocols/validation'
import { RequiredField } from '@/presentation/validation/required-field'
import { ValidationComposite } from '@/presentation/validation/validation-composite'

export const makeValidationCompositeFactory = (): ValidationComposite => {
  const validations: IValidation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredField(field))
  }
  return new ValidationComposite(validations)
}
