import { IUser } from '@/domain/protocols/user'
import { GetUserController } from '@/presentation/controllers/user'
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
})
