import type { IUser } from '@/domain/protocols/user'
import { UpdateUserController } from '@/presentation/controllers/user/update-user-controller'
import { MissingMandatoryParamError, ServerError } from '@/presentation/errors'
import { badRequest, serverError } from '@/presentation/http-helper'
import type { IValidation } from '@/presentation/protocols/validation'
import { mockValidation } from '@/tests/unit/presentation/mocks/mocks-user-validation'
import { fixtureUpdateUser, fixtureUpdateUserOutput } from '@/tests/unit/presentation/fixtures/fixtures-user'
import { mocksUserController } from '@/tests/unit/presentation/mocks/mocks-user-controller'
import MockDate from 'mockdate'

type SutTypes = {
  validationStub: IValidation
  userStub: IUser
  sut: UpdateUserController
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const userStub = mocksUserController()
  const sut = new UpdateUserController(userStub, validationStub)
  return {
    sut,
    userStub,
    validationStub
  }
}

describe('UpdateUserController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  it('Should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const updateUser = fixtureUpdateUser()
    const validateSpy =
    jest
      .spyOn(validationStub, 'validate')
    await sut.handle(updateUser)
    expect(validateSpy).toHaveBeenCalledWith(updateUser)
  })

  it('Should return 400 error if validation return an error', async () => {
    const { sut, validationStub } = makeSut()
    const updateUser = fixtureUpdateUser()
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingMandatoryParamError('document').serializeErrors())
    const expectedResponse = await sut.handle(updateUser)
    expect(expectedResponse).toEqual(badRequest(new MissingMandatoryParamError('document').serializeErrors()))
  })

  it('Should call update method of the user use case class with correct values', async () => {
    const { sut, userStub } = makeSut()
    const updateUser = fixtureUpdateUser()
    const updateSpy =
    jest
      .spyOn(userStub, 'update')
    await sut.handle(updateUser)
    expect(updateSpy).toHaveBeenCalledWith(updateUser)
  })

  it('Should return 500 error if update method throw exception error', async () => {
    const { sut, userStub } = makeSut()
    const updateUser = fixtureUpdateUser()
    jest
      .spyOn(userStub, 'update')
      .mockImplementationOnce(() => { throw new Error() })
    const expectedResponse = await sut.handle(updateUser)
    expect(expectedResponse.statusCode).toBe(500)
    expect(expectedResponse).toEqual(serverError(new ServerError(expectedResponse.body.stack)))
  })

  it('Should return 200 status if update method on succeeds', async () => {
    const { sut } = makeSut()
    const updateUser = fixtureUpdateUser()
    const expectedResponse = await sut.handle(updateUser)
    expect(expectedResponse.statusCode).toBe(200)
    expect(expectedResponse.body).toStrictEqual(fixtureUpdateUserOutput())
  })
})
