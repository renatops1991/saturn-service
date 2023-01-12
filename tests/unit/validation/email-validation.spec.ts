import { EmailValidation } from '@/validation/email-validation'
import { IEmailValidator } from '@/validation/protocols/email-validator'
import { mockEmailValidator } from '@/tests/unit/presentation/mocks/mocks-user-validation'
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
  it('Should call EmailValidator with corrects values', () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest
      .spyOn(emailValidatorStub, 'isValid')
    sut.validate({ email: 'foo@bar.com' })
    expect(isValidSpy).toHaveBeenCalledWith('foo@bar.com')
  })

  it('Should return a InvalidParamError if email is invalid', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest
      .spyOn(emailValidatorStub, 'isValid')
      .mockReturnValueOnce(false)
    const expectedError = sut.validate({ email: 'foo' })
    expect(expectedError).toEqual(new InvalidParamError('email').serializeErrors())
  })

  it('Should return null if email is valid', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest
      .spyOn(emailValidatorStub, 'isValid')
    const expectedError = sut.validate({ email: 'foo@bar.com' })
    expect(expectedError).toBeNull()
  })

  it('Should return null if email is not provided', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest
      .spyOn(emailValidatorStub, 'isValid')
    const expectedError = sut.validate({ })
    expect(expectedError).toBeNull()
  })
})
