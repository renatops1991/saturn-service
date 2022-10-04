import { User } from '../../../../src/domain/protocols/user/user'
import { SignUpUserController } from '../../../../src/presentation/controllers/signup-user-controller'
import { CreateUserOutputDto } from '../../../../src/presentation/dtos/user/create-user-output.dto'
import { CreateUserDto } from '../../../../src/presentation/dtos/user/create-user.dto'
import {
  MissingMandatoryParamError,
  InvalidParamError,
  ServerError
} from '../../../../src/presentation/errors'
import { badRequest, serverError } from '../../../../src/presentation/http-helper'
import { EmailValidator } from '../../../../src/presentation/protocols/email-validator'
import { fixturesCreateUser, fixturesCreateUserOutput } from '../fixtures/fixtures-user'
import { mockEmailValidator } from '../mocks/mock-email-validator'

interface SutTypes {
  sut: SignUpUserController
  emailValidatorStub: EmailValidator
  userStub: User
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = mockEmailValidator()
  const userStub = makeCreateUser()
  const sut = new SignUpUserController(emailValidatorStub, userStub)

  return {
    sut,
    emailValidatorStub,
    userStub
  }
}

const makeCreateUser = (): User => {
  class UserStub implements User {
    async create (user: CreateUserDto): Promise<CreateUserOutputDto> {
      return await new Promise(resolve => resolve(fixturesCreateUserOutput()))
    }
  }

  return new UserStub()
}

describe('User Controller', () => {
  it('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const userDto = fixturesCreateUser()
    delete (userDto.name)
    const expectedResponse = await sut.handle(userDto)
    expect(expectedResponse.statusCode).toBe(400)
    expect(expectedResponse).toEqual(badRequest(new MissingMandatoryParamError('name')))
  })

  it('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const userDto = fixturesCreateUser()
    delete (userDto.email)
    const expectedResponse = await sut.handle(userDto)
    expect(expectedResponse.statusCode).toBe(400)
    expect(expectedResponse).toEqual(badRequest(new MissingMandatoryParamError('email')))
  })

  it('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const userDto = fixturesCreateUser()
    delete (userDto.password)
    const expectedResponse = await sut.handle(userDto)
    expect(expectedResponse.statusCode).toBe(400)
    expect(expectedResponse).toEqual(badRequest(new MissingMandatoryParamError('password')))
  })

  it('Should return 400 if no passwordConfirmation is provided', async () => {
    const { sut } = makeSut()
    const userDto = fixturesCreateUser()
    delete (userDto.passwordConfirmation)
    const expectedResponse = await sut.handle(userDto)
    expect(expectedResponse.statusCode).toBe(400)
    expect(expectedResponse).toEqual(badRequest(new MissingMandatoryParamError('passwordConfirmation')))
  })

  it('Should call is valid method with correct value', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const userDto = fixturesCreateUser()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    await sut.handle(userDto)
    expect(isValidSpy).toHaveBeenCalledWith(userDto.email)
  })

  it('Should return 400 error if email provided is not valid', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const userDto = fixturesCreateUser()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => false)
    const expectedResponse = await sut.handle(userDto)
    expect(expectedResponse.statusCode).toBe(400)
    expect(expectedResponse.body).toEqual(new InvalidParamError('email'))
  })

  it('Should return 400 error if password confirmation provided is fail', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const userDto = fixturesCreateUser()
    userDto.passwordConfirmation = 'wrongPasswordConfirmation'
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => false)
    const expectedResponse = await sut.handle(userDto)
    expect(expectedResponse.statusCode).toBe(400)
    expect(expectedResponse.body).toEqual(new InvalidParamError('passwordConfirmation'))
  })

  it('Should return 500 error if SignUpController throw exception error', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const userDto = fixturesCreateUser()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => { throw new Error() })
    const expectedResponse = await sut.handle(userDto)
    expect(expectedResponse.statusCode).toBe(500)
    expect(expectedResponse).toEqual(serverError(new ServerError(expectedResponse.body)))
  })

  it('Should call User use case with correct values', async () => {
    const { sut, userStub } = makeSut()
    const userDto = fixturesCreateUser()
    const userSpy = jest.spyOn(userStub, 'create')
    await sut.handle(userDto)
    expect(userSpy).toHaveBeenCalledWith(userDto)
  })

  it('Should return 500 error if create method throw exception error', async () => {
    const { sut, userStub } = makeSut()
    const userDto = fixturesCreateUser()
    jest.spyOn(userStub, 'create').mockImplementationOnce(() => { throw new Error() })
    const expectedResponse = await sut.handle(userDto)
    expect(expectedResponse.statusCode).toBe(500)
    expect(expectedResponse).toEqual(serverError(new ServerError(expectedResponse.body)))
  })

  it('Should return 200 success status if data provided is valid', async () => {
    const { sut } = makeSut()
    const userDto = fixturesCreateUser()
    const expectedResponse = await sut.handle(userDto)
    expect(expectedResponse.statusCode).toBe(200)
    expect(expectedResponse.body).toEqual(fixturesCreateUserOutput())
  })
})
