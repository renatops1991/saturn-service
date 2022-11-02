import { IAuthentication } from '@/domain/protocols/authentication'
import { LoginUserController } from '@/presentation/controllers/user/login-user-controller'
import {
  InvalidParamError,
  MissingMandatoryParamError,
  ServerError
} from '@/presentation/errors'
import { badRequest, serverError, unauthorized } from '@/presentation/http-helper'
import { IEmailValidator } from '@/presentation/protocols/email-validator'
import { fixturesLoginUser } from '@/tests/unit/presentation/fixtures/fixtures-user'
import { mockAuthentication } from '@/tests/unit/presentation/mocks/mock-authentication'
import { mockEmailValidator } from '@/tests/unit/presentation/mocks/mock-email-validator'

type sutTypes = {
  sut: LoginUserController
  emailValidatorStub: IEmailValidator
  authenticationStub: IAuthentication
}

const makeSut = (): sutTypes => {
  const authenticationStub = mockAuthentication()
  const emailValidatorStub = mockEmailValidator()
  const sut = new LoginUserController(emailValidatorStub, authenticationStub)
  return {
    sut,
    emailValidatorStub,
    authenticationStub
  }
}
describe('LoginUserController', () => {
  it('Should return 400 error if email no provided', async () => {
    const { sut } = makeSut()
    const loginUserDto = fixturesLoginUser()
    delete loginUserDto.email
    const expectedResponse = await sut.handle(loginUserDto)
    expect(expectedResponse).toEqual(badRequest(new MissingMandatoryParamError('email').serializeErrors()))
  })

  it('Should return 400 error if password no provided', async () => {
    const { sut } = makeSut()
    const loginUserDto = fixturesLoginUser()
    delete loginUserDto.password
    const expectedResponse = await sut.handle(loginUserDto)
    expect(expectedResponse).toEqual(badRequest(new MissingMandatoryParamError('password').serializeErrors()))
  })

  it('Should call isValid method of the EmailValidator class with correct value', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const loginUserDto = fixturesLoginUser()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    await sut.handle(fixturesLoginUser())
    expect(isValidSpy).toHaveBeenCalledWith(loginUserDto.email)
  })

  it('Should return 400 error if email is invalid', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const expectedResponse = await sut.handle(fixturesLoginUser())
    expect(expectedResponse).toEqual(badRequest(new InvalidParamError('email').serializeErrors()))
  })

  it('Should return 500 error if LoginUserController throws exception error', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const expectedResponse = await sut.handle(fixturesLoginUser())
    expect(expectedResponse).toEqual(serverError(new ServerError(expectedResponse.body.stack)))
  })

  it('Should call Auth method with correct value', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(fixturesLoginUser())
    expect(authSpy).toHaveBeenCalledWith(fixturesLoginUser())
  })

  it('Should return 401 error if user provided credentials is invalid', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(null)
    const expectedResponse = await sut.handle(fixturesLoginUser())
    expect(expectedResponse).toEqual(unauthorized())
  })
})
