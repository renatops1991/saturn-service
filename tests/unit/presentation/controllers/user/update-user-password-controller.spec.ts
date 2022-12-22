import { IUser } from '@/domain/protocols/user'
import { IValidation } from '@/presentation/protocols/validation'
import { UpdateUserPasswordController } from '@/presentation/controllers/user/update-user-password-controller'
import { mockValidation } from '@/tests/unit/presentation/mocks/mock-user-validation'
import { mockUserController } from '@/tests/unit/presentation/mocks/mock-user-controller'
import { fixtureUpdateUserPasswordRequest } from '@/tests/unit/presentation/fixtures/fixtures-user'
import { MissingMandatoryParamError, InvalidParamError, ServerError } from '@/presentation/errors'
import { noContent, serverError } from '@/presentation/http-helper'

type SutTypes = {
  userStub: IUser
  validationStub: IValidation
  sut: UpdateUserPasswordController
}

const makeSut = (): SutTypes => {
  const userStub = mockUserController()
  const validationStub = mockValidation()
  const sut = new UpdateUserPasswordController(userStub, validationStub)
  return {
    sut,
    userStub,
    validationStub
  }
}
describe('UpdateUserPasswordController', () => {
  it('Should call validate method with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(fixtureUpdateUserPasswordRequest())
    const expectedResponse = fixtureUpdateUserPasswordRequest()
    expect(validateSpy).toHaveBeenCalledWith(expectedResponse)
  })

  it('Should return MissingMandatoryParamError if password is no provided', async () => {
    const { sut, validationStub } = makeSut()
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingMandatoryParamError('password').serializeErrors())
    const makeUpdateUserPassword = fixtureUpdateUserPasswordRequest()
    delete makeUpdateUserPassword.password
    const expectedResponse = await sut.handle(makeUpdateUserPassword)
    expect(expectedResponse.statusCode).toEqual(400)
    expect(expectedResponse.body).toEqual(new MissingMandatoryParamError('password').serializeErrors())
  })

  it('Should return MissingMandatoryParamError if passwordConfirmation is no provided', async () => {
    const { sut, validationStub } = makeSut()
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingMandatoryParamError('passwordConfirmation').serializeErrors())
    const makeUpdateUserPassword = fixtureUpdateUserPasswordRequest()
    delete makeUpdateUserPassword.password
    const expectedResponse = await sut.handle(makeUpdateUserPassword)
    expect(expectedResponse.statusCode).toEqual(400)
    expect(expectedResponse.body).toEqual(new MissingMandatoryParamError('passwordConfirmation').serializeErrors())
  })

  it('Should return InvalidParamError if the password and passwordConfirmation is different', async () => {
    const { sut, validationStub } = makeSut()
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new InvalidParamError('passwordConfirmation').serializeErrors())
    const makeUpdateUserPassword = fixtureUpdateUserPasswordRequest()
    makeUpdateUserPassword.passwordConfirmation = 'foo'
    const expectedResponse = await sut.handle(makeUpdateUserPassword)
    expect(expectedResponse.statusCode).toEqual(400)
    expect(expectedResponse.body).toEqual(new InvalidParamError('passwordConfirmation').serializeErrors())
  })

  it('Should call updateUserPassword method with correct values', async () => {
    const { sut, userStub } = makeSut()
    const redefineUserPasswordSpy = jest
      .spyOn(userStub, 'updateUserPassword')
    const makeUpdateUserPassword = fixtureUpdateUserPasswordRequest()
    await sut.handle(makeUpdateUserPassword)
    expect(redefineUserPasswordSpy).toHaveBeenCalledWith(fixtureUpdateUserPasswordRequest())
  })

  it('Should return 204 if redefine user password on succeeds', async () => {
    const { sut } = makeSut()
    const expectedResponse = await sut.handle(fixtureUpdateUserPasswordRequest())
    expect(expectedResponse).toEqual(noContent())
  })

  it('Should return 500 error if updateUserPassword method throw exception error', async () => {
    const { sut, userStub } = makeSut()
    jest
      .spyOn(userStub, 'updateUserPassword')
      .mockImplementationOnce(() => { throw new Error() })
    const expectedResponse = await sut.handle(fixtureUpdateUserPasswordRequest())
    expect(expectedResponse.statusCode).toEqual(500)
    expect(expectedResponse).toEqual(serverError(new ServerError(expectedResponse.body.stack)))
  })
})
