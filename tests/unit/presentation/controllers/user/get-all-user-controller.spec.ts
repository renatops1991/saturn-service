import { IUser } from '@/domain/protocols/user'
import { GetUserDto } from '@/main/dtos/user'
import { GetAllUserController } from '@/presentation/controllers/user/get-all-user-controller'
import { badRequest, serverError, success } from '@/presentation/http-helper'
import { IValidation } from '@/presentation/protocols/validation'
import {
  InvalidParamError,
  ServerError
} from '@/presentation/errors'
import { mockValidation } from '@/tests/unit/presentation/mocks/mocks-user-validation'
import { mocksUserController } from '@/tests/unit/presentation/mocks/mocks-user-controller'
import { fixtureUpdateUserOutput } from '@/tests/unit/presentation/fixtures/fixtures-user'
import MockDate from 'mockdate'

type SutTypes = {
  sut: GetAllUserController
  validationStub: IValidation
  userStub: IUser
}
const makeSut = (): SutTypes => {
  const userStub = mocksUserController()
  const validationStub = mockValidation()
  const sut = new GetAllUserController(userStub, validationStub)

  return {
    sut,
    userStub,
    validationStub
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

  it('Should call validate method with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const getUserDto: GetUserDto = {
      userId: 'foo',
      document: '11111111',
      startDate: new Date(),
      endDate: new Date()
    }
    const validateSpy = jest
      .spyOn(validationStub, 'validate')
    await sut.handle(getUserDto)
    expect(validateSpy).toHaveBeenCalledWith(getUserDto)
  })

  it('Should return 400 if validation return an error', async () => {
    const { sut, validationStub } = makeSut()
    const getUserDto: GetUserDto = {
      userId: 'foo',
      document: '11111111',
      email: 'foo@example',
      startDate: new Date(),
      endDate: new Date()
    }
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new InvalidParamError('email').serializeErrors())
    const expectedResponse = await sut.handle(getUserDto)
    expect(expectedResponse.statusCode).toEqual(400)
    expect(expectedResponse).toEqual(badRequest(new InvalidParamError('email').serializeErrors()))
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
