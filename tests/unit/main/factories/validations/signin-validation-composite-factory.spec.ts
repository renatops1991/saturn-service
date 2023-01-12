
import { makeSignInValidationCompositeFactory } from '@/main/factories/validations/signin-validation-composite-factory'
import type { IValidation } from '@/presentation/protocols/validation'
import { EmailValidation } from '@/validation/email-validation'
import { RequiredField } from '@/validation/required-field'
import { ValidationComposite } from '@/validation/validation-composite'
import { mockEmailValidator } from '@/tests/unit/presentation/mocks/mocks-user-validation'

jest.mock('@/validation/validation-composite')

describe('SignInValidationCompositeFactory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeSignInValidationCompositeFactory()
    const validations: IValidation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredField(field))
    }
    validations.push(
      new EmailValidation('email', mockEmailValidator())
    )
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
