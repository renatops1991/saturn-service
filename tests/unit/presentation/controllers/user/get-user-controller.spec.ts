import { IUser } from '@/domain/protocols/user'
import { GetUserController } from '@/presentation/controllers/user'
import { ServerError } from '@/presentation/errors'
import { serverError } from '@/presentation/http-helper'
import { mockUserController } from '@/tests/unit/presentation/mocks/mock-user-controller'

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
  it('Should call getUser method with correct value', async () => {
    const { sut, userStub } = makeSut()
    const getUserSpy = jest
      .spyOn(userStub, 'getUser')
    await sut.handle('foo')
    expect(getUserSpy).toHaveBeenCalledWith('foo')
  })

  it('Should return 500 error if getUser throws exception error', async () => {
    const { sut, userStub } = makeSut()
    jest
      .spyOn(userStub, 'getUser').mockRejectedValueOnce(() => { throw new Error() })
    const expectedResponse = await sut.handle('foo')
    expect(expectedResponse).toEqual(serverError(new ServerError(expectedResponse.body.stack)))
  })
})
