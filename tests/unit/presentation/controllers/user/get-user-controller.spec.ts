import { IUser } from '@/domain/protocols/user'
import { GetUserController } from '@/presentation/controllers/user'
import { ServerError } from '@/presentation/errors'
import { serverError, success } from '@/presentation/http-helper'
import { mockUserController } from '@/tests/unit/presentation/mocks/mock-user-controller'
import { fixtureUpdateUserOutput } from '@/tests/unit/presentation/fixtures/fixtures-user'
import MockDate from 'mockdate'

type sutTypes = {
  sut: GetUserController
  userStub: IUser
}

const makeSut = (): sutTypes => {
  const userStub = mockUserController()
  const sut = new GetUserController(userStub)
  return {
    sut,
    userStub
  }
}
describe('GetUserController', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  it('Should call getUser method with correct value', async () => {
    const { sut, userStub } = makeSut()
    const getUserSpy = jest
      .spyOn(userStub, 'getUser')
    await sut.handle('foo')
    expect(getUserSpy).toHaveBeenCalledWith('foo')
  })

  it('Should return object correct user', async () => {
    const { sut } = makeSut()
    const expectedResponse = await sut.handle('foo')
    expect(expectedResponse.statusCode).toEqual(200)
    expect(expectedResponse).toEqual(success(fixtureUpdateUserOutput()))
  })

  it('Should return 500 error if getUser throws exception error', async () => {
    const { sut, userStub } = makeSut()
    jest
      .spyOn(userStub, 'getUser').mockRejectedValueOnce(() => { throw new Error() })
    const expectedResponse = await sut.handle('foo')
    expect(expectedResponse).toEqual(serverError(new ServerError(expectedResponse.body.stack)))
  })
})
