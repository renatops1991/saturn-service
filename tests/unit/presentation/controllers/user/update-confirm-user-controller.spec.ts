
import { fixtureUpdateConfirmUser } from '../../fixtures/fixtures-user'
import { UpdateConfirmUserController } from '@/presentation/controllers/user/update-confirm-user-controller'
import type { IUser } from '@/domain/protocols/user'
import { MissingMandatoryParamError, ServerError } from '@/presentation/errors'
import { noContent, serverError } from '@/presentation/http-helper'
import { mocksUserController } from '../../mocks/mocks-user-controller'
import { RequiredField } from '@/validation/required-field'

type SutTypes = {
  requiredFieldStub: RequiredField
  userStub: IUser
  sut: UpdateConfirmUserController
}

const makeSut = (): SutTypes => {
  const requiredFieldStub = new RequiredField('confirmUser')
  const userStub = mocksUserController()
  const sut = new UpdateConfirmUserController(userStub)
  return {
    requiredFieldStub,
    sut,
    userStub
  }
}
describe('UpdateUserConfirmationController', () => {
  it('Should return MissingMandatoryParamError if validation fails', async () => {
    const { sut, requiredFieldStub } = makeSut()
    jest
      .spyOn(requiredFieldStub, 'validate')
    const expectedResponse = await sut.handle({ confirmUser: undefined as any, userId: 'foo' })
    expect(expectedResponse).toEqual(new MissingMandatoryParamError('confirmUser').serializeErrors())
  })

  it('Should call updateUserConfirm method with corrects values', async () => {
    const { sut, userStub } = makeSut()
    const updateUseConfirmSpy = jest
      .spyOn(userStub, 'updateConfirmUser')
    await sut.handle(fixtureUpdateConfirmUser())
    expect(updateUseConfirmSpy).toHaveBeenCalledWith({ confirmUser: true, userId: 'foo' })
  })

  it('Should return 204 if update confirm user on succeeds', async () => {
    const { sut } = makeSut()
    const expectedResponse = await sut.handle(fixtureUpdateConfirmUser())
    expect(expectedResponse).toEqual(noContent())
    expect(expectedResponse.statusCode).toEqual(204)
  })

  it('Should return 500 error if updateConfirmUser method throw exception error', async () => {
    const { sut, userStub } = makeSut()
    jest
      .spyOn(userStub, 'updateConfirmUser')
      .mockImplementationOnce(() => { throw new Error() })
    const expectedResponse = await sut.handle(fixtureUpdateConfirmUser())
    expect(expectedResponse.statusCode).toEqual(500)
    expect(expectedResponse).toEqual(serverError(new ServerError(expectedResponse.body.stack)))
  })
})
