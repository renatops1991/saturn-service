import { LoginUserController } from '@/presentation/controllers/user/login-user-controller'
import { LoginUserDto } from '@/presentation/dtos/user/login-user.dto'
import { MissingMandatoryParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/http-helper'

describe('LoginUserController', () => {
  it('Should return 400 error if email no provided', async () => {
    const sut = new LoginUserController()
    const loginUserDto: LoginUserDto = {
      email: '',
      password: 'foo'
    }
    const expectedResponse = await sut.handle(loginUserDto)
    expect(expectedResponse).toEqual(badRequest(new MissingMandatoryParamError('email').serializeErrors()))
  })

  it('Should return 400 error if password no provided', async () => {
    const sut = new LoginUserController()
    const loginUserDto: LoginUserDto = {
      email: 'foo@example.com',
      password: ''
    }
    const expectedResponse = await sut.handle(loginUserDto)
    expect(expectedResponse).toEqual(badRequest(new MissingMandatoryParamError('password').serializeErrors()))
  })
})
