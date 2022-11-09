import { EmailValidation } from '@/presentation/validation/email-validation'
import { mockEmailValidator } from '@/tests/unit/presentation/mocks/mock-user-validation'
import { IEmailValidator } from '@/presentation/protocols/email-validator'
import { InvalidParamError } from '@/presentation/errors'

type SutTypes = {
  sut: EmailValidation
  emailValidatorStub: IEmailValidator
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = mockEmailValidator()
  const sut = new EmailValidation('email', emailValidatorStub)

  return {
    sut,
    emailValidatorStub
  }
}
describe('EmailValidation', () => {
  it('Should return a InvalidParamError if email is invalid', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const expectedError = sut.validate({ email: 'foo' })
    expect(expectedError).toEqual(new InvalidParamError('email').serializeErrors())
  })

  it('Should return null if email is valid', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid')
    const expectedError = sut.validate({ email: 'foo@bar.com' })
    expect(expectedError).toBeNull()
  })
})
