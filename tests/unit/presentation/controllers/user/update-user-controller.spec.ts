import { IUser } from '@/domain/protocols/user'
import { UpdateUserController } from '@/presentation/controllers/user/update-user-controller'
import { MissingMandatoryParamError, ServerError } from '@/presentation/errors'
import { badRequest, serverError } from '@/presentation/http-helper'
import { IValidation } from '@/presentation/protocols/validation'
import { mockValidation } from '@/tests/unit/presentation/mocks/mock-user-validation'
import { fixturesUpdateUser } from '@/tests/unit/presentation/fixtures/fixtures-user'
import { mockUserController } from '@/tests/unit/presentation/mocks/mock-user-controller'

type SutTypes = {
  validationStub: IValidation
  userStub: IUser
  sut: UpdateUserController
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const userStub = mockUserController()
  const sut = new UpdateUserController(userStub, validationStub)
  return {
    sut,
    userStub,
    validationStub
  }
}

describe('UpdateUserController', () => {
  it('Should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const updateUser = fixturesUpdateUser()
    const validateSpy =
    jest
      .spyOn(validationStub, 'validate')
    await sut.handle(updateUser)
    expect(validateSpy).toHaveBeenCalledWith(updateUser)
  })

  it('Should return 400 error if validation return an error', async () => {
    const { sut, validationStub } = makeSut()
    const updateUser = fixturesUpdateUser()
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingMandatoryParamError('document').serializeErrors())
    const expectedResponse = await sut.handle(updateUser)
    expect(expectedResponse).toEqual(badRequest(new MissingMandatoryParamError('document').serializeErrors()))
  })

  it('Should call update method of the user use case class with correct values', async () => {
    const { sut, userStub } = makeSut()
    const updateUser = fixturesUpdateUser()
    const updateSpy =
    jest
      .spyOn(userStub, 'update')
    await sut.handle(updateUser)
    expect(updateSpy).toHaveBeenCalledWith(updateUser)
  })

  it('Should return 500 error if update method throw exception error', async () => {
    const { sut, userStub } = makeSut()
    const updateUser = fixturesUpdateUser()
    jest
      .spyOn(userStub, 'update')
      .mockImplementationOnce(() => { throw new Error() })
    const expectedResponse = await sut.handle(updateUser)
    expect(expectedResponse.statusCode).toBe(500)
    expect(expectedResponse).toEqual(serverError(new ServerError(expectedResponse.body.stack)))
  })
})
