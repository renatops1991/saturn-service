import { makeValidationCompositeFactory } from '@/main/factories/validation/validation-composite-factory'
import { IValidation } from '@/presentation/protocols/validation'
import { CompareField } from '@/presentation/validation/compare-field'
import { EmailValidation } from '@/presentation/validation/email-validation'
import { RequiredField } from '@/presentation/validation/required-field'
import { ValidationComposite } from '@/presentation/validation/validation-composite'
import { mockEmailValidator } from '@/tests/unit/presentation/mocks/mock-user-validation'

jest.mock('@/presentation/validation/validation-composite')

describe('ValidationCompositeFactory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeValidationCompositeFactory()
    const validations: IValidation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredField(field))
    }
    validations.push(
      new CompareField('password', 'passwordConfirmation')
    )
    validations.push(
      new EmailValidation('email', mockEmailValidator())
    )
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
