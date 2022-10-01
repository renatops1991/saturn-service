import { SignUpUserController } from '../../../../src/presentation/controllers/signup-user-controller'
import { MissingMandatoryParamError } from '../../../../src/presentation/errors/missing-mandatory-param-error'
import { Validation } from '../../../../src/presentation/protocols/validation'

interface SutTypes {
  sut: SignUpUserController
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const sut = new SignUpUserController(validationStub)

  return {
    sut,
    validationStub
  }
}

const mockValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
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
})
