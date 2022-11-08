import { InvalidParamError } from '@/presentation/errors'
import { CompareField } from '@/presentation/validation/compare-field'

describe('CompareField', () => {
  it('Should return a InvalidParamError if validation fails', async () => {
    const sut = new CompareField('password', 'passwordConfirmation')
    const expectedError = sut.validate({
      password: '123', passwordConfirmation: 'foo'
    })
    expect(expectedError).toEqual(new InvalidParamError('passwordConfirmation').serializeErrors())
    expect(expectedError.message).toEqual('Invalid param error')
  })

  it('Should return null if validation on succeeds', async () => {
    const sut = new CompareField('password', 'passwordConfirmation')
    const expectedError = sut.validate({
      password: '123', passwordConfirmation: '123'
    })
    expect(expectedError).toBeNull()
  })
})
