import { LoginUserController } from '@/presentation/controllers/user/login-user-controller'
import { InvalidParamError, MissingMandatoryParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/http-helper'
import { IEmailValidator } from '@/presentation/protocols/email-validator'
import { fixturesLoginUser } from '../../fixtures/fixtures-user'
import { mockEmailValidator } from '../../mocks/mock-email-validator'

type sutTypes = {
  sut: LoginUserController
  emailValidatorStub: IEmailValidator
}

const makeSut = (): sutTypes => {
  const emailValidatorStub = mockEmailValidator()
  const sut = new LoginUserController(emailValidatorStub)
  return {
    sut,
    emailValidatorStub
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
    await sut.handle(loginUserDto)
    expect(isValidSpy).toHaveBeenCalledWith(loginUserDto.email)
  })

  it('Should return 400 error if email is invalid', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const loginUserDto = fixturesLoginUser()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const expectedResponse = await sut.handle(loginUserDto)
    expect(expectedResponse).toEqual(badRequest(new InvalidParamError('email').serializeErrors()))
  })
})
