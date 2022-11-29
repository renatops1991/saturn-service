import { IValidation } from '@/presentation/protocols/validation'
import { RequiredField } from '@/validation/required-field'
import { ValidationComposite } from '@/validation/validation-composite'

export const makeUpdateConfirmUserValidationCompositeFactory = (): ValidationComposite => {
  const validations: IValidation[] = []

  validations.push(new RequiredField('confirmUser'))

  return new ValidationComposite(validations)
}
