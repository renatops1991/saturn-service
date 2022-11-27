import { IAuthentication } from '@/domain/protocols/authentication'
import { AccessDeniedError } from '@/presentation/errors/access-denied-error'
import { forbidden, serverError, success } from '@/presentation/http-helper'
import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'
import { mockAuthentication } from '../mocks/mock-authentication'

type SutTypes = {
  sut: AuthMiddleware
  authenticationStub: IAuthentication
}

const makeSut = (role?: string): SutTypes => {
  const authenticationStub = mockAuthentication()
  const sut = new AuthMiddleware(authenticationStub, role)
  return {
    sut,
    authenticationStub
  }
}

describe('Auth Middleware', () => {
  it('Should return 403 if x-access-token no exists in headers', async () => {
    const { sut } = makeSut()
    const expectedResponse = await sut.handle({})
    expect(expectedResponse).toEqual(forbidden(new AccessDeniedError().serializeErrors()))
  })

  it('Should call loadUserByToken method with correct accessToken', async () => {
    const role = 'admin'
    const { sut, authenticationStub } = makeSut(role)
    const loadUserByTokenSpy = jest
      .spyOn(authenticationStub, 'loadUserByToken')
    await sut.handle({
      accessToken: 'accessToken'
    })
    expect(loadUserByTokenSpy).toHaveBeenCalledWith('accessToken', role)
  })

  it('Should return 403 error if  loadUserByToken returns null', async () => {
    const { sut, authenticationStub } = makeSut()
    jest
      .spyOn(authenticationStub, 'loadUserByToken')
      .mockResolvedValueOnce(null)
    const expectedResponse = await sut.handle({ accessToken: 'accessToken' })
    expect(expectedResponse).toEqual(forbidden(new AccessDeniedError().serializeErrors()))
  })

  it('Should return 500 error if loadUserByToken throws exception error', async () => {
    const { sut, authenticationStub } = makeSut()
    jest
      .spyOn(authenticationStub, 'loadUserByToken')
      .mockRejectedValue(new Error())
    const expectedResponse = await sut.handle({ accessToken: 'accessToken' })
    expect(expectedResponse.body.message).toEqual(serverError(new Error()).body.message)
    expect(expectedResponse.body.statusCode).toEqual(serverError(new Error()).body.statusCode)
  })

  it('Should return 200 if loadUserByToken method return an user', async () => {
    const { sut } = makeSut()
    const expectedResponse = await sut.handle({ accessToken: 'accessToken' })
    expect(expectedResponse).toEqual(success({ accountId: 'foo' }))
  })
})
