import { makeValidationCompositeFactory } from '@/main/factories/validation/validation-composite-factory'
import { IValidation } from '@/presentation/protocols/validation'
import { RequiredField } from '@/presentation/validation/required-field'
import { ValidationComposite } from '@/presentation/validation/validation-composite'

jest.mock('@/presentation/validation/validation-composite')

describe('ValidationCompositeFactory', () => {
  it('Should call ValidationComposite with all validations', () => {
    const validations: IValidation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredField(field))
    }
    makeValidationCompositeFactory()
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
