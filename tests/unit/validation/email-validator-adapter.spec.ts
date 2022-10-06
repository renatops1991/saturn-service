import { EmailValidatorAdapter } from '../../../src/presentation/validation/email-validator-adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

interface SutType {
  sut: EmailValidatorAdapter
}

const makeSut = (): SutType => {
  const sut = new EmailValidatorAdapter()
  return {
    sut
  }
}
describe('EmailValidatorAdapter', () => {
  it('Should return false if email passed is invalid ', async () => {
    const { sut } = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('foo')
    expect(isValid).toBe(false)
  })

  it('Should return true if email passed is valid ', async () => {
    const { sut } = makeSut()
    const isValid = sut.isValid('foo@email.com')
    expect(isValid).toBe(true)
  })

  it('Should call validator with correct value ', async () => {
    const { sut } = makeSut()
    const email = 'foo@email.com'
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid(email)
    expect(isEmailSpy).toHaveBeenCalledWith(email)
  })
})
