import { UpdateUserController } from '@/presentation/controllers/user/update-user-controller'
import { MissingMandatoryParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/http-helper'
import { IValidation } from '@/presentation/protocols/validation'
import { mockValidation } from '@/tests/unit/presentation/mocks/mock-user-validation'
import { fixturesUpdateUser } from '../../fixtures/fixtures-user'

type SutTypes = {
  validationStub: IValidation
  sut: UpdateUserController
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const sut = new UpdateUserController(validationStub)
  return {
    sut,
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
})
