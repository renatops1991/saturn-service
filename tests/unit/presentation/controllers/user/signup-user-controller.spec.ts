
import { IUser } from '@/domain/protocols/user'
import { IAuthentication } from '@/domain/protocols/authentication'
import { IEmailValidator } from '@/validation/protocols/email-validator'
import { SignUpUserController } from '@/presentation/controllers/user/signup-user-controller'
import { SignUpUserDto, UserOutputDto } from '@/main/dtos/user'
import {
  MissingMandatoryParamError,
  InvalidParamError,
  ServerError
} from '@/presentation/errors'
import { badRequest, forbidden, serverError } from '@/presentation/http-helper'
import { IValidation } from '@/presentation/protocols/validation'
import { fixturesCreateUserRequest, fixturesUserOutput } from '@/tests/unit/presentation/fixtures/fixtures-user'
import { mockEmailValidator, mockValidation } from '@/tests/unit/presentation/mocks/mock-user-validation'
import { mockAuthentication } from '@/tests/unit/presentation/mocks/mock-authentication'
import { EmailInUseError } from '@/presentation/errors/email-in-use-error'

type SutTypes = {
  sut: SignUpUserController
  emailValidatorStub: IEmailValidator
  userStub: IUser
  validationStub: IValidation
  authenticationStub: IAuthentication
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = mockEmailValidator()
  const userStub = makeCreateUser()
  const validationStub = mockValidation()
  const authenticationStub = mockAuthentication()
  const sut = new SignUpUserController(userStub, validationStub, authenticationStub)

  return {
    sut,
    emailValidatorStub,
    userStub,
    validationStub,
    authenticationStub
  }
}

const makeCreateUser = (): IUser => {
  class UserStub implements IUser {
    async create (user: SignUpUserDto): Promise<UserOutputDto> {
      return await new Promise(resolve => resolve(fixturesUserOutput()))
    }
  }

  return new UserStub()
}

describe('User Controller', () => {
  it('Should return 400 error if email provided is not valid', async () => {
    const { sut, validationStub } = makeSut()
    const userDto = fixturesCreateUserRequest()
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new InvalidParamError('email').serializeErrors())
    const expectedResponse = await sut.handle(userDto)
    expect(expectedResponse.statusCode).toBe(400)
    expect(expectedResponse).toEqual(badRequest(new InvalidParamError('email').serializeErrors()))
  })

  it('Should return 500 error if SignUpController throw exception error', async () => {
    const { sut, validationStub } = makeSut()
    const userDto = fixturesCreateUserRequest()
    jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => { throw new Error() })
    const expectedResponse = await sut.handle(userDto)
    expect(expectedResponse.statusCode).toBe(500)
    expect(expectedResponse).toEqual(serverError(new ServerError(expectedResponse.body.stack)))
  })

  it('Should call User use case with correct values', async () => {
    const { sut, userStub } = makeSut()
    const userDto = fixturesCreateUserRequest()
    const userSpy = jest.spyOn(userStub, 'create')
    await sut.handle(userDto)
    expect(userSpy).toHaveBeenCalledWith(userDto)
  })

  it('Should return 500 error if create method throw exception error', async () => {
    const { sut, userStub } = makeSut()
    const userDto = fixturesCreateUserRequest()
    jest.spyOn(userStub, 'create').mockImplementationOnce(() => { throw new Error() })
    const expectedResponse = await sut.handle(userDto)
    expect(expectedResponse.statusCode).toBe(500)
    expect(expectedResponse).toEqual(serverError(new ServerError(expectedResponse.body.stack)))
  })

  it('Should return 200 success status if data provided is valid', async () => {
    const { sut } = makeSut()
    const userDto = fixturesCreateUserRequest()
    const expectedResponse = await sut.handle(userDto)
    expect(expectedResponse.statusCode).toBe(201)
    expect(expectedResponse.body).toEqual(fixturesUserOutput())
  })

  it('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const userDto = fixturesCreateUserRequest()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(userDto)
    expect(validateSpy).toHaveBeenCalledWith(userDto)
  })

  it('Should return 400 if Validation return an error', async () => {
    const { sut, validationStub } = makeSut()
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingMandatoryParamError('foo').serializeErrors())
    const expectedResponse = await sut.handle(fixturesCreateUserRequest())
    expect(expectedResponse).toEqual(badRequest(new MissingMandatoryParamError('foo').serializeErrors()))
  })

  it('Should return 400 error if password confirmation provided is fail', async () => {
    const { sut, validationStub } = makeSut()
    const userDto = fixturesCreateUserRequest()
    userDto.passwordConfirmation = 'wrongPasswordConfirmation'
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValue(new InvalidParamError('passwordConfirmation').serializeErrors())
    const expectedResponse = await sut.handle(userDto)
    expect(expectedResponse).toEqual(badRequest(new InvalidParamError('passwordConfirmation').serializeErrors()))
  })

  it('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const userDto = fixturesCreateUserRequest()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(userDto)
    expect(authSpy).toHaveBeenCalledWith({
      email: 'foo@example.com',
      password: '12345'
    })
  })

  it('Should return 500 error if Authentication throw exception error', async () => {
    const { sut, authenticationStub } = makeSut()
    const userDto = fixturesCreateUserRequest()
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(() => { throw new Error() })
    const expectedResponse = await sut.handle(userDto)
    expect(expectedResponse.statusCode).toBe(500)
    expect(expectedResponse).toEqual(serverError(new ServerError(expectedResponse.body.stack)))
  })

  it('Should return 403 error if UserUseCase returns null', async () => {
    const { sut, userStub } = makeSut()
    const userDto = fixturesCreateUserRequest()
    jest.spyOn(userStub, 'create').mockResolvedValueOnce(null)
    const expectedResponse = await sut.handle(userDto)
    expect(expectedResponse.statusCode).toBe(403)
    expect(expectedResponse).toEqual(forbidden((new EmailInUseError().serializeErrors())))
  })
})
