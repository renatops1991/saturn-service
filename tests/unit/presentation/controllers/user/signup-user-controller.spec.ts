
import type { IUser } from '@/domain/protocols/user'
import type { IAuthentication } from '@/domain/protocols/authentication'
import type { IEmailValidator } from '@/validation/protocols/email-validator'
import { SignUpUserController } from '@/presentation/controllers/user/signup-user-controller'
import {
  MissingMandatoryParamError,
  InvalidParamError,
  ServerError
} from '@/presentation/errors'
import { badRequest, forbidden, serverError } from '@/presentation/http-helper'
import type { IValidation } from '@/presentation/protocols/validation'
import { fixtureCreateUserRequest, fixtureUserOutput } from '@/tests/unit/presentation/fixtures/fixtures-user'
import { mockEmailValidator, mockValidation } from '@/tests/unit/presentation/mocks/mocks-user-validation'
import { mocksAuthentication } from '@/tests/unit/presentation/mocks/mocks-authentication'
import { EmailInUseError } from '@/presentation/errors/email-in-use-error'
import { mocksUserController } from '../../mocks/mocks-user-controller'

type SutTypes = {
  sut: SignUpUserController
  emailValidatorStub: IEmailValidator
  userStub: IUser
  validationStub: IValidation
  authenticationStub: IAuthentication
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = mockEmailValidator()
  const userStub = mocksUserController()
  const validationStub = mockValidation()
  const authenticationStub = mocksAuthentication()
  const sut = new SignUpUserController(userStub, validationStub, authenticationStub)

  return {
    sut,
    emailValidatorStub,
    userStub,
    validationStub,
    authenticationStub
  }
}

describe('User Controller', () => {
  it('Should return 400 error if email provided is not valid', async () => {
    const { sut, validationStub } = makeSut()
    const userDto = fixtureCreateUserRequest()
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new InvalidParamError('email').serializeErrors())
    const expectedResponse = await sut.handle(userDto)
    expect(expectedResponse.statusCode).toBe(400)
    expect(expectedResponse).toEqual(badRequest(new InvalidParamError('email').serializeErrors()))
  })

  it('Should return 500 error if SignUpController throw exception error', async () => {
    const { sut, validationStub } = makeSut()
    const userDto = fixtureCreateUserRequest()
    jest
      .spyOn(validationStub, 'validate')
      .mockImplementationOnce(() => { throw new Error() })
    const expectedResponse = await sut.handle(userDto)
    expect(expectedResponse.statusCode).toBe(500)
    expect(expectedResponse).toEqual(serverError(new ServerError(expectedResponse.body.stack)))
  })

  it('Should call User use case with correct values', async () => {
    const { sut, userStub } = makeSut()
    const userDto = fixtureCreateUserRequest()
    const userSpy = jest
      .spyOn(userStub, 'create')
    await sut.handle(userDto)
    expect(userSpy).toHaveBeenCalledWith(userDto)
  })

  it('Should return 500 error if create method throw exception error', async () => {
    const { sut, userStub } = makeSut()
    const userDto = fixtureCreateUserRequest()
    jest
      .spyOn(userStub, 'create')
      .mockImplementationOnce(() => { throw new Error() })
    const expectedResponse = await sut.handle(userDto)
    expect(expectedResponse.statusCode).toBe(500)
    expect(expectedResponse).toEqual(serverError(new ServerError(expectedResponse.body.stack)))
  })

  it('Should return 200 success status if data provided is valid', async () => {
    const { sut } = makeSut()
    const userDto = fixtureCreateUserRequest()
    const expectedResponse = await sut.handle(userDto)
    expect(expectedResponse.statusCode).toBe(201)
    expect(expectedResponse.body).toEqual(fixtureUserOutput())
  })

  it('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const userDto = fixtureCreateUserRequest()
    const validateSpy = jest
      .spyOn(validationStub, 'validate')
    await sut.handle(userDto)
    expect(validateSpy).toHaveBeenCalledWith(userDto)
  })

  it('Should return 400 if Validation return an error', async () => {
    const { sut, validationStub } = makeSut()
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingMandatoryParamError('foo').serializeErrors())
    const expectedResponse = await sut.handle(fixtureCreateUserRequest())
    expect(expectedResponse).toEqual(badRequest(new MissingMandatoryParamError('foo').serializeErrors()))
  })

  it('Should return 400 error if password confirmation provided is fail', async () => {
    const { sut, validationStub } = makeSut()
    const userDto = fixtureCreateUserRequest()
    userDto.passwordConfirmation = 'wrongPasswordConfirmation'
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValue(new InvalidParamError('passwordConfirmation').serializeErrors())
    const expectedResponse = await sut.handle(userDto)
    expect(expectedResponse).toEqual(badRequest(new InvalidParamError('passwordConfirmation').serializeErrors()))
  })

  it('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const userDto = fixtureCreateUserRequest()
    const authSpy = jest
      .spyOn(authenticationStub, 'auth')
    await sut.handle(userDto)
    expect(authSpy).toHaveBeenCalledWith({
      email: 'foo@example.com',
      password: '12345'
    })
  })

  it('Should return 500 error if Authentication throw exception error', async () => {
    const { sut, authenticationStub } = makeSut()
    const userDto = fixtureCreateUserRequest()
    jest
      .spyOn(authenticationStub, 'auth')
      .mockImplementationOnce(() => { throw new Error() })
    const expectedResponse = await sut.handle(userDto)
    expect(expectedResponse.statusCode).toBe(500)
    expect(expectedResponse).toEqual(serverError(new ServerError(expectedResponse.body.stack)))
  })

  it('Should return 403 error if UserUseCase returns null', async () => {
    const { sut, userStub } = makeSut()
    const userDto = fixtureCreateUserRequest()
    jest
      .spyOn(userStub, 'create')
      .mockResolvedValueOnce(null)
    const expectedResponse = await sut.handle(userDto)
    expect(expectedResponse.statusCode).toBe(403)
    expect(expectedResponse).toEqual(forbidden((new EmailInUseError().serializeErrors())))
  })
})
