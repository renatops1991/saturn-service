
import { SignUpUserDto, UserOutputDto } from '@/main/dtos/user'
import { fixturesUserOutput } from '../../fixtures/fixtures-user'
import { UpdateConfirmUserDto } from '@/main/dtos/user/update-confirm-user.dto'
import { UpdateConfirmUserController } from '@/presentation/controllers/user/update-confirm-user-controller'
import { mockValidation } from '../../mocks/mock-user-validation'
import { IValidation } from '@/presentation/protocols/validation'
import { IUser } from '@/domain/protocols/user'
import { MissingMandatoryParamError, ServerError } from '@/presentation/errors'
import { badRequest, noContent, serverError } from '@/presentation/http-helper'

type SutTypes = {
  validationStub: IValidation
  userStub: IUser
  sut: UpdateConfirmUserController
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const userStub = mockUserUseCase()
  const sut = new UpdateConfirmUserController(validationStub, userStub)
  return {
    validationStub,
    sut,
    userStub
  }
}

export const fixturesUpdateUserConfirm = (): UpdateConfirmUserDto => ({
  confirmUser: true,
  userId: 'foo'
})

export const mockUserUseCase = (): IUser => {
  class UserStub implements IUser {
    async create (user: SignUpUserDto): Promise<UserOutputDto> {
      return await new Promise(resolve => resolve(fixturesUserOutput()))
    }

    async updateConfirmUser (confirm: UpdateConfirmUserDto): Promise<void> {
      return await Promise.resolve()
    }
  }

  return new UserStub()
}

describe('UpdateUserConfirmationController', () => {
  it('Should call validation method with corrects values', async () => {
    const { sut, validationStub } = makeSut()
    const loadByTokenSpy = jest
      .spyOn(validationStub, 'validate')
    await sut.handle(fixturesUpdateUserConfirm())
    expect(loadByTokenSpy).toHaveBeenCalledWith({ confirmUser: true, userId: 'foo' })
  })

  it('Should return 400 error if validate method return an error', async () => {
    const { sut, validationStub } = makeSut()
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingMandatoryParamError('confirmUser').serializeErrors())
    const expectedResponse = await sut.handle(fixturesUpdateUserConfirm())
    expect(expectedResponse).toEqual(badRequest(new MissingMandatoryParamError('confirmUser').serializeErrors()))
  })

  it('Should return 500 error if validate method throw exception error', async () => {
    const { sut, validationStub } = makeSut()
    jest
      .spyOn(validationStub, 'validate')
      .mockImplementationOnce(() => { throw new Error() })
    const expectedResponse = await sut.handle(fixturesUpdateUserConfirm())
    expect(expectedResponse.statusCode).toEqual(500)
    expect(expectedResponse).toEqual(serverError(new ServerError(expectedResponse.body.stack)))
  })

  it('Should call updateUserConfirm method with corrects values', async () => {
    const { sut, userStub } = makeSut()
    const updateUseConfirmSpy = jest
      .spyOn(userStub, 'updateConfirmUser')
    await sut.handle(fixturesUpdateUserConfirm())
    expect(updateUseConfirmSpy).toHaveBeenCalledWith({ confirmUser: true, userId: 'foo' })
  })

  it('Should return 204 if update confirm user on succeeds', async () => {
    const { sut } = makeSut()
    const expectedResponse = await sut.handle(fixturesUpdateUserConfirm())
    expect(expectedResponse).toEqual(noContent())
    expect(expectedResponse.statusCode).toEqual(204)
  })

  it('Should return 500 error if updateConfirmUser method throw exception error', async () => {
    const { sut, userStub } = makeSut()
    jest
      .spyOn(userStub, 'updateConfirmUser')
      .mockImplementationOnce(() => { throw new Error() })
    const expectedResponse = await sut.handle(fixturesUpdateUserConfirm())
    expect(expectedResponse.statusCode).toEqual(500)
    expect(expectedResponse).toEqual(serverError(new ServerError(expectedResponse.body.stack)))
  })
})
