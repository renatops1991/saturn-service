import { makeSignUpValidationCompositeFactory } from '@/main/factories/validations/signup-validation-composite-factory'
import { IValidation } from '@/presentation/protocols/validation'
import { CompareField } from '@/validation/compare-field'
import { EmailValidation } from '@/validation/email-validation'
import { RequiredField } from '@/validation/required-field'
import { ValidationComposite } from '@/validation/validation-composite'
import { mockEmailValidator } from '@/tests/unit/presentation/mocks/mocks-user-validation'

jest.mock('@/validation/validation-composite')

describe('SignUpValidationCompositeFactory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeSignUpValidationCompositeFactory()
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
