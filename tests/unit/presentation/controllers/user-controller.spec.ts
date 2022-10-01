import { SignUpUserController } from '../../../../src/presentation/controllers/signup-user-controller'
import { MissingMandatoryParamError } from '../../../../src/presentation/errors/missing-mandatory-param-error'
import { EmailValidator } from '../../../../src/presentation/protocols/email-validator'

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

const mockEmailValidator = (): EmailValidator => {
  class EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidator()
}

describe('User Controller', () => {
  it('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()

    const userDto = {
      name: '',
      email: 'foo@example.com',
      password: '12345',
      passwordConfirmation: '12345'
    }
    const expectedResponse = sut.handle(userDto)
    expect(expectedResponse.statusCode).toBe(400)
    expect(expectedResponse.body).toEqual(new MissingMandatoryParamError('name'))
  })

  it('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const userDto = {
      name: 'John Foo Bar',
      email: '',
      password: '12345',
      passwordConfirmation: '12345'
    }
    const expectedResponse = sut.handle(userDto)
    expect(expectedResponse.statusCode).toBe(400)
    expect(expectedResponse.body).toEqual(new MissingMandatoryParamError('email'))
  })

  it('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const userDto = {
      name: 'John Foo Bar',
      email: 'foo@example.com',
      password: '',
      passwordConfirmation: '12345'
    }
    const expectedResponse = sut.handle(userDto)
    expect(expectedResponse.statusCode).toBe(400)
    expect(expectedResponse.body).toEqual(new MissingMandatoryParamError('password'))
  })

  it('Should return 400 if no passwordConfirmation is provided', async () => {
    const { sut } = makeSut()
    const userDto = {
      name: 'John Foo Bar',
      email: 'foo@example.com',
      password: '12345',
      passwordConfirmation: ''
    }
    const expectedResponse = sut.handle(userDto)
    expect(expectedResponse.statusCode).toBe(400)
    expect(expectedResponse.body).toEqual(new MissingMandatoryParamError('passwordConfirmation'))
  })

  it('Should call is valid method with correct value', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const userDto = {
      name: 'John Foo Bar',
      email: 'foo@example.com',
      password: '12345',
      passwordConfirmation: '12345'
    }
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    sut.handle(userDto)
    expect(isValidSpy).toHaveBeenCalledWith(userDto.email)
  })
})
