import { SignUpUserController } from '../../../../src/presentation/controllers/signup-user-controller'
import {
  MissingMandatoryParamError,
  InvalidParamError,
  ServerError
} from '../../../../src/presentation/errors'
import { badRequest, serverError } from '../../../../src/presentation/http-helper'
import { EmailValidator } from '../../../../src/presentation/protocols/email-validator'
import { fixturesCreateUser } from '../fixtures/fixtures-user'
import { mockEmailValidator } from '../mocks/mock-email-validator'

interface SutTypes {
  sut: SignUpUserController
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = mockEmailValidator()
  const sut = new SignUpUserController(emailValidatorStub)

  return {
    sut,
    emailValidatorStub
  }
}

describe('User Controller', () => {
  it('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const userDto = fixturesCreateUser()
    delete (userDto.name)
    const expectedResponse = sut.handle(userDto)
    expect(expectedResponse.statusCode).toBe(400)
    expect(expectedResponse).toEqual(badRequest(new MissingMandatoryParamError('name')))
  })

  it('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const userDto = fixturesCreateUser()
    delete (userDto.email)
    const expectedResponse = sut.handle(userDto)
    expect(expectedResponse.statusCode).toBe(400)
    expect(expectedResponse).toEqual(badRequest(new MissingMandatoryParamError('email')))
  })

  it('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const userDto = fixturesCreateUser()
    delete (userDto.password)
    const expectedResponse = sut.handle(userDto)
    expect(expectedResponse.statusCode).toBe(400)
    expect(expectedResponse).toEqual(badRequest(new MissingMandatoryParamError('password')))
  })

  it('Should return 400 if no passwordConfirmation is provided', async () => {
    const { sut } = makeSut()
    const userDto = fixturesCreateUser()
    delete (userDto.passwordConfirmation)
    const expectedResponse = sut.handle(userDto)
    expect(expectedResponse.statusCode).toBe(400)
    expect(expectedResponse).toEqual(badRequest(new MissingMandatoryParamError('passwordConfirmation')))
  })

  it('Should call is valid method with correct value', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const userDto = fixturesCreateUser()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    sut.handle(userDto)
    expect(isValidSpy).toHaveBeenCalledWith(userDto.email)
  })

  it('Should return 400 error if email provided is not valid', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const userDto = fixturesCreateUser()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => false)
    const expectedResponse = sut.handle(userDto)
    expect(expectedResponse.statusCode).toBe(400)
    expect(expectedResponse.body).toEqual(new InvalidParamError('email'))
  })

  it('Should return 500 error if SignUpController throw exception error', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const userDto = fixturesCreateUser()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => { throw new Error() })
    const expectedResponse = sut.handle(userDto)
    expect(expectedResponse.statusCode).toBe(500)
    expect(expectedResponse).toEqual(serverError(new ServerError(expectedResponse.body)))
  })
})
