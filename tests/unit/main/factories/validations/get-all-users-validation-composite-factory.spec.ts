import { makeGetAllUsersValidationCompositeFactory } from '@/main/factories/validations/get-all-users-validation-composite-factory'
import type { IValidation } from '@/presentation/protocols/validation'
import { mockEmailValidator } from '@/tests/unit/presentation/mocks/mocks-user-validation'
import { CompareDate } from '@/validation/compare-date'
import { EmailValidation } from '@/validation/email-validation'
import { ValidationComposite } from '@/validation/validation-composite'

jest.mock('@/validation/validation-composite')

describe('GetAllUsersValidationCompositeFactory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeGetAllUsersValidationCompositeFactory()
    const validations: IValidation[] = []

    validations.push(
      new EmailValidation('email', mockEmailValidator())
    )

    validations.push(
      new CompareDate('startDate', 'endDate')
    )
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
