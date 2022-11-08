
import { IUser } from '@/domain/protocols/user'
import { SignUpUserController } from '@/presentation/controllers/user/signup-user-controller'
import { CreateUserOutputDto } from '@/presentation/dtos/user/create-user-output.dto'
import { CreateUserDto } from '@/presentation/dtos/user/create-user.dto'
import {
  MissingMandatoryParamError,
  InvalidParamError,
  ServerError
} from '@/presentation/errors'
import { badRequest, serverError } from '@/presentation/http-helper'
import { IEmailValidator } from '@/presentation/protocols/email-validator'
import { IValidation } from '@/presentation/protocols/validation'
import { fixturesCreateUserRequest, fixturesCreateUserOutput } from '@/tests/unit/presentation/fixtures/fixtures-user'
import { mockEmailValidator, mockValidation } from '@/tests/unit/presentation/mocks/mock-user-validation'

type SutTypes = {
  sut: SignUpUserController
  emailValidatorStub: IEmailValidator
  userStub: IUser
  validationStub: IValidation
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = mockEmailValidator()
  const userStub = makeCreateUser()
  const validationStub = mockValidation()
  const sut = new SignUpUserController(emailValidatorStub, userStub, validationStub)

  return {
    sut,
    emailValidatorStub,
    userStub,
    validationStub
  }
}

const makeCreateUser = (): IUser => {
  class UserStub implements IUser {
    async create (user: CreateUserDto): Promise<CreateUserOutputDto> {
      return await new Promise(resolve => resolve(fixturesCreateUserOutput()))
    }
  }

  return new UserStub()
}

describe('User Controller', () => {
  it('Should call is valid method with correct value', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const userDto = fixturesCreateUserRequest()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    await sut.handle(userDto)
    expect(isValidSpy).toHaveBeenCalledWith(userDto.email)
  })

  it('Should return 400 error if email provided is not valid', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const userDto = fixturesCreateUserRequest()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => false)
    const expectedResponse = await sut.handle(userDto)
    expect(expectedResponse.statusCode).toBe(400)
    expect(expectedResponse).toEqual(badRequest(new InvalidParamError('email').serializeErrors()))
  })

  it('Should return 400 error if password confirmation provided is fail', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const userDto = fixturesCreateUserRequest()
    userDto.passwordConfirmation = 'wrongPasswordConfirmation'
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => false)
    const expectedResponse = await sut.handle(userDto)
    expect(expectedResponse.statusCode).toBe(400)
    expect(expectedResponse).toEqual(badRequest(new InvalidParamError('passwordConfirmation').serializeErrors()))
  })

  it('Should return 500 error if SignUpController throw exception error', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const userDto = fixturesCreateUserRequest()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => { throw new Error() })
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
    expect(expectedResponse.statusCode).toBe(200)
    expect(expectedResponse.body).toEqual(fixturesCreateUserOutput())
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
})
