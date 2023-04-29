import type { IAuthentication } from '@/domain/protocols/authentication'
import { SignInUserController } from '@/presentation/controllers/user/signin-user-controller'
import { fixtureLoginUser, fixtureUserOutput } from '@/tests/unit/presentation/fixtures/fixtures-user'
import { mocksAuthentication } from '@/tests/unit/presentation/mocks/mocks-authentication'
import { mockValidation } from '@/tests/unit/presentation/mocks/mocks-user-validation'
import {
  MissingMandatoryParamError,
  ServerError
} from '@/presentation/errors'
import {
  badRequest,
  serverError,
  success,
  unauthorized
} from '@/presentation/http-helper'
import type { IValidation } from '@/presentation/protocols/validation'

type sutTypes = {
  sut: SignInUserController
  validationStub: IValidation
  authenticationStub: IAuthentication
}

const makeSut = (): sutTypes => {
  const authenticationStub = mocksAuthentication()
  const validationStub = mockValidation()
  const sut = new SignInUserController(authenticationStub, validationStub)
  return {
    sut,
    validationStub,
    authenticationStub
  }
}
describe('SignInUserController', () => {
  it('Should return 500 error if Validation throws exception error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate')
      .mockImplementationOnce(() => { throw new Error() })
    const expectedResponse = await sut.handle(fixtureLoginUser())
    expect(expectedResponse).toEqual(serverError(new ServerError(expectedResponse.body.stack)))
  })

  it('Should return 400 error if email is invalid', async () => {
    const { sut, validationStub } = makeSut()
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingMandatoryParamError('email').serializeErrors())
    const expectedResponse = await sut.handle(fixtureLoginUser())
    expect(expectedResponse).toEqual(badRequest(new MissingMandatoryParamError('email').serializeErrors()))
  })

  it('Should return 400 error if password is invalid', async () => {
    const { sut, validationStub } = makeSut()
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingMandatoryParamError('password').serializeErrors())
    const expectedResponse = await sut.handle(fixtureLoginUser())
    expect(expectedResponse).toEqual(badRequest(new MissingMandatoryParamError('password').serializeErrors()))
  })

  it('Should call validate method of the Validation class with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const loginUserDto = fixtureLoginUser()
    const isValidSpy = jest
      .spyOn(validationStub, 'validate')
    await sut.handle(loginUserDto)
    expect(isValidSpy).toHaveBeenCalledWith({
      email: loginUserDto.email,
      password: loginUserDto.password
    })
  })

  it('Should return 401 error if user provided credentials is invalid', async () => {
    const { sut, authenticationStub } = makeSut()
    jest
      .spyOn(authenticationStub, 'auth')
      .mockResolvedValue(null)
    const expectedResponse = await sut.handle(fixtureLoginUser())
    expect(expectedResponse).toEqual(unauthorized())
  })

  it('Should return 500 error if Authentication throws exception error', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth')
      .mockRejectedValueOnce(() => { throw new Error() })
    const expectedResponse = await sut.handle(fixtureLoginUser())
    expect(expectedResponse).toEqual(serverError(new ServerError(expectedResponse.body.stack)))
  })

  it('Should call Auth method with correct value', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest
      .spyOn(authenticationStub, 'auth')
    await sut.handle(fixtureLoginUser())
    expect(authSpy).toHaveBeenCalledWith(fixtureLoginUser())
  })

  it('Should return 200 if user provided credentials is valid', async () => {
    const { sut } = makeSut()
    const expectedResponse = await sut.handle(fixtureLoginUser())
    expect(expectedResponse).toEqual(success(fixtureUserOutput()))
  })
})
