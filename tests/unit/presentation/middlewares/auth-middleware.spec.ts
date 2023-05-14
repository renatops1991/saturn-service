import type { IAuthentication } from '@/domain/protocols/authentication'
import { AccessDeniedError } from '@/presentation/errors/access-denied-error'
import { forbidden, serverError, success } from '@/presentation/http-helper'
import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'
import { mocksAuthentication } from '../mocks/mocks-authentication'
import MockDate from 'mockdate'

type SutTypes = {
  sut: AuthMiddleware
  authenticationStub: IAuthentication
}

const makeSut = (role?: string): SutTypes => {
  const authenticationStub = mocksAuthentication()
  const sut = new AuthMiddleware(authenticationStub, role)
  return {
    sut,
    authenticationStub
  }
}

describe('Auth Middleware', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  
  it('Should return 403 if x-access-token no exists in headers', async () => {
    const { sut } = makeSut()
    const expectedResponse = await sut.handle({})
    expect(expectedResponse).toEqual(forbidden(new AccessDeniedError().serializeErrors()))
  })

  it('Should call loadByToken method with correct accessToken', async () => {
    const role = 'admin'
    const { sut, authenticationStub } = makeSut(role)
    const loadUserByTokenSpy = jest
      .spyOn(authenticationStub, 'loadByToken')
    await sut.handle({ accessToken: 'accessToken' })
    expect(loadUserByTokenSpy).toHaveBeenCalledWith('accessToken', role)
  })

  it('Should return 403 error if  loadByToken returns null', async () => {
    const { sut, authenticationStub } = makeSut()
    jest
      .spyOn(authenticationStub, 'loadByToken')
      .mockResolvedValueOnce(null)
    const expectedResponse = await sut.handle({ accessToken: 'accessToken' })
    expect(expectedResponse).toEqual(forbidden(new AccessDeniedError().serializeErrors()))
  })

  it('Should return 500 error if loadByToken throws exception error', async () => {
    const { sut, authenticationStub } = makeSut()
    jest
      .spyOn(authenticationStub, 'loadByToken')
      .mockRejectedValue(new Error())
    const expectedResponse = await sut.handle({ accessToken: 'accessToken' })
    expect(expectedResponse.body.message).toEqual(serverError(new Error()).body.message)
    expect(expectedResponse.body.statusCode).toEqual(serverError(new Error()).body.statusCode)
  })

  it('Should return 200 if loadByToken method return an user', async () => {
    const { sut } = makeSut()
    const expectedResponse = await sut.handle({ accessToken: 'accessToken' })
    expect(expectedResponse).toEqual(success({ userId: 'foo' }))
  })
})
