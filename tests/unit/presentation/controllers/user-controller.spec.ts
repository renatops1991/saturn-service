import { UserController } from '../../../../src/presentation/controllers/user-controller'
import { MissingMandatoryParamError } from '../../../../src/presentation/errors/missing-mandatory-param-error'

describe('User Controller', () => {
  it('Should return 400 if no name is provided', async () => {
    const sut = new UserController()
    const userDto = {
      name: '',
      email: 'foo@example.com',
      password: '12345',
      passwordConfirmation: '12345'
    }
    const expectedResponse = sut.create(userDto)
    expect(expectedResponse.statusCode).toBe(400)
    expect(expectedResponse.body).toEqual(new MissingMandatoryParamError('name'))
  })

  it('Should return 400 if no email is provided', async () => {
    const sut = new UserController()
    const userDto = {
      name: 'John Foo Bar',
      email: '',
      password: '12345',
      passwordConfirmation: '12345'
    }
    const expectedResponse = sut.create(userDto)
    expect(expectedResponse.statusCode).toBe(400)
    expect(expectedResponse.body).toEqual(new MissingMandatoryParamError('email'))
  })
})
