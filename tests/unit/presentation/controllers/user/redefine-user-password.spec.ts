import { IUser } from '@/domain/protocols/user'
import { IValidation } from '@/presentation/protocols/validation'
import { RedefineUserPassword } from '@/presentation/controllers/user/redefine-user-password'
import { mockValidation } from '@/tests/unit/presentation/mocks/mock-user-validation'
import { mockUserController } from '@/tests/unit/presentation/mocks/mock-user-controller'
import { fixtureRedefineUserPassword } from '@/tests/unit/presentation/fixtures/fixtures-user'
import { MissingMandatoryParamError, InvalidParamError } from '@/presentation/errors'
import { noContent } from '@/presentation/http-helper'

type SutTypes = {
  userStub: IUser
  validationStub: IValidation
  sut: RedefineUserPassword
}

const makeSut = (): SutTypes => {
  const userStub = mockUserController()
  const validationStub = mockValidation()
  const sut = new RedefineUserPassword(userStub, validationStub)
  return {
    sut,
    userStub,
    validationStub
  }
}
describe('RedefineUserPassword', () => {
  it('Should call validate method with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(fixtureRedefineUserPassword())
    const expectedResponse = fixtureRedefineUserPassword()
    expect(validateSpy).toHaveBeenCalledWith(expectedResponse)
  })

  it('Should return MissingMandatoryParamError if password is no provided', async () => {
    const { sut, validationStub } = makeSut()
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingMandatoryParamError('password').serializeErrors())
    const makeRedefineUserPassword = fixtureRedefineUserPassword()
    delete makeRedefineUserPassword.password
    const expectedResponse = await sut.handle(makeRedefineUserPassword)
    expect(expectedResponse.statusCode).toEqual(400)
    expect(expectedResponse.body).toEqual(new MissingMandatoryParamError('password').serializeErrors())
  })

  it('Should return MissingMandatoryParamError if passwordConfirmation is no provided', async () => {
    const { sut, validationStub } = makeSut()
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingMandatoryParamError('passwordConfirmation').serializeErrors())
    const makeRedefineUserPassword = fixtureRedefineUserPassword()
    delete makeRedefineUserPassword.password
    const expectedResponse = await sut.handle(makeRedefineUserPassword)
    expect(expectedResponse.statusCode).toEqual(400)
    expect(expectedResponse.body).toEqual(new MissingMandatoryParamError('passwordConfirmation').serializeErrors())
  })

  it('Should return InvalidParamError if the password and passwordConfirmation is different', async () => {
    const { sut, validationStub } = makeSut()
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new InvalidParamError('passwordConfirmation').serializeErrors())
    const makeRedefineUserPassword = fixtureRedefineUserPassword()
    makeRedefineUserPassword.passwordConfirmation = 'foo'
    const expectedResponse = await sut.handle(makeRedefineUserPassword)
    expect(expectedResponse.statusCode).toEqual(400)
    expect(expectedResponse.body).toEqual(new InvalidParamError('passwordConfirmation').serializeErrors())
  })

  it('Should call redefineUserPassword method with correct values', async () => {
    const { sut, userStub } = makeSut()
    const redefineUserPasswordSpy = jest
      .spyOn(userStub, 'redefineUserPassword')
    const makeRedefineUserPassword = fixtureRedefineUserPassword()
    await sut.handle(makeRedefineUserPassword)
    expect(redefineUserPasswordSpy).toHaveBeenCalledWith(fixtureRedefineUserPassword())
  })

  it('Should return 204 if redefine user password on succeeds', async () => {
    const { sut } = makeSut()
    const expectedResponse = await sut.handle(fixtureRedefineUserPassword())
    expect(expectedResponse).toEqual(noContent())
  })
})
