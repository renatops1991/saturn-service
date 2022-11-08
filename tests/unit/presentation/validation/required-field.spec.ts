import { MissingMandatoryParamError } from '@/presentation/errors'
import { RequiredField } from '@/presentation/validation/required-field'

describe('RequiredField', () => {
  it('Should return MissingMandatoryParamError if validation fails', async () => {
    const sut = new RequiredField('name')
    const expectedError = sut.validate({ name: '' })
    expect(expectedError).toEqual(new MissingMandatoryParamError('name').serializeErrors())
    expect(expectedError.message).toEqual('Missing mandatory parameter')
  })

  it('Should return null if validation on succeeds', async () => {
    const sut = new RequiredField('name')
    const expectedError = sut.validate({ name: 'foo' })
    expect(expectedError).toBeNull()
  })
})
