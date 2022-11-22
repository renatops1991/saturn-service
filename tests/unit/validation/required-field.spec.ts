import { MissingMandatoryParamError } from '@/presentation/errors'
import { RequiredField } from '@/validation/required-field'

type SutTypes = {
  sut: RequiredField
}

const makeSut = (): SutTypes => {
  const sut = new RequiredField('name')
  return {
    sut
  }
}

describe('RequiredField', () => {
  it('Should return MissingMandatoryParamError if validation fails', async () => {
    const { sut } = makeSut()
    const expectedError = sut.validate({ name: '' })
    expect(expectedError).toEqual(new MissingMandatoryParamError('name').serializeErrors())
    expect(expectedError.message).toEqual('Missing mandatory parameter')
  })

  it('Should return null if validation on succeeds', async () => {
    const { sut } = makeSut()
    const expectedError = sut.validate({ name: 'foo' })
    expect(expectedError).toBeNull()
  })
})
