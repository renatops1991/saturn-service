import { IUser } from '@/domain/protocols/user'
import { GetUserDto } from '@/main/dtos/user'
import { GetAllUserController } from '@/presentation/controllers/user/get-all-user-controller'
import { mocksUserController } from '@/tests/unit/presentation/mocks/mocks-user-controller'
import { fixtureUpdateUserOutput } from '@/tests/unit/presentation/fixtures/fixtures-user'
import { serverError, success } from '@/presentation/http-helper'
import MockDate from 'mockdate'
import { ServerError } from '@/presentation/errors'

type SutTypes = {
  sut: GetAllUserController
  userStub: IUser
}
const makeSut = (): SutTypes => {
  const userStub = mocksUserController()
  const sut = new GetAllUserController(userStub)

  return {
    sut,
    userStub
  }
}

describe('getAllUserController', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })

  it('Should call getAllUsers method with correct values', async () => {
    const { sut, userStub } = makeSut()
    const getUserDto: GetUserDto = {
      userId: 'foo',
      document: '11111111',
      startDate: new Date(),
      endDate: new Date()
    }
    const getAllUserSpy = jest
      .spyOn(userStub, 'getAllUsers')
    await sut.handle(getUserDto)
    expect(getAllUserSpy).toHaveBeenCalledWith(getUserDto)
  })

  it('Should return users on succeeds', async () => {
    const { sut } = makeSut()
    const getUserDto: GetUserDto = {
      userId: 'foo',
      document: '11111111',
      startDate: new Date(),
      endDate: new Date()
    }
    const users = await sut.handle(getUserDto)
    expect(users.statusCode).toEqual(200)
    expect(users).toEqual(success([fixtureUpdateUserOutput()]))
  })

  it('Should return 500 error if getAllUsers throws exception error', async () => {
    const { sut, userStub } = makeSut()
    const getUserDto: GetUserDto = {
      userId: 'foo',
      document: '11111111',
      startDate: new Date(),
      endDate: new Date()
    }
    jest
      .spyOn(userStub, 'getAllUsers')
      .mockRejectedValueOnce(() => { throw new Error() })
    const expectedResponse = await sut.handle(getUserDto)
    expect(expectedResponse.statusCode).toEqual(500)
    expect(expectedResponse).toEqual(serverError(new ServerError(expectedResponse.body.stack)))
  })
})
