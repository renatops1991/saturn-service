import { EmailValidatorAdapter } from '../../../src/presentation/validation/email-validator-adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))
describe('EmailValidatorAdapter', () => {
  it('Should return false if email passed is invalid ', async () => {
    const sut = new EmailValidatorAdapter()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('foo')
    expect(isValid).toBe(false)
  })

  it('Should return true if email passed is valid ', async () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('foo@email.com')
    expect(isValid).toBe(true)
  })
})
