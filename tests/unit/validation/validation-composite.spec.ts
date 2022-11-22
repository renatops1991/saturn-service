import { MissingMandatoryParamError } from '@/presentation/errors'
import { IValidation } from '@/presentation/protocols/validation'
import { ValidationComposite } from '@/validation/validation-composite'
import { mockValidation } from '../presentation/mocks/mock-user-validation'

type SutTypes = {
  sut: ValidationComposite
  validationStub: IValidation[]
}

const makeSut = (): SutTypes => {
  const validationStub = [mockValidation(), mockValidation()]
  const sut = new ValidationComposite(validationStub)
  return {
    sut,
    validationStub
  }
}
describe('ValidationComposite', () => {
  it('Should return an error if any validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub[0], 'validate').mockReturnValueOnce(new MissingMandatoryParamError('email').serializeErrors())
    const expectedError = sut.validate({ name: 'foo' })
    expect(expectedError).toEqual(new MissingMandatoryParamError('email').serializeErrors())
    expect(expectedError.message).toEqual('Missing mandatory parameter')
  })

  it('Should return the first error if more then one validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub[0], 'validate').mockReturnValueOnce(new MissingMandatoryParamError('name').serializeErrors())
    jest.spyOn(validationStub[1], 'validate').mockReturnValueOnce(new MissingMandatoryParamError('email').serializeErrors())
    const expectedError = sut.validate({ name: '' })
    expect(expectedError).toEqual(new MissingMandatoryParamError('name').serializeErrors())
    expect(expectedError.message).toEqual('Missing mandatory parameter')
  })

  it('Should return null if validations on succeeds', async () => {
    const { sut } = makeSut()
    const expectedError = sut.validate({ email: 'foo' })
    expect(expectedError).toBeNull()
  })
})
