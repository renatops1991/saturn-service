
import { SignUpUserDto, UserOutputDto } from '@/main/dtos/user'
import { fixturesUserOutput } from '../../fixtures/fixtures-user'
import { UpdateConfirmUserDto } from '@/main/dtos/user/update-confirm-user.dto'
import { UpdateConfirmUserController } from '@/presentation/controllers/user/update-confirm-user-controller'
import { mockValidation } from '../../mocks/mock-user-validation'
import { IValidation } from '@/presentation/protocols/validation'
import { IUser } from '@/domain/protocols/user'
import { MissingMandatoryParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/http-helper'

type SutTypes = {
  validationStub: IValidation
  sut: UpdateConfirmUserController
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const sut = new UpdateConfirmUserController(validationStub)
  return {
    validationStub,
    sut
  }
}

export const fixturesUpdateUserConfirm = (): UpdateConfirmUserDto => ({
  confirmUser: true
})

export const mockUserUseCase = (): IUser => {
  class UserStub implements IUser {
    async create (user: SignUpUserDto): Promise<UserOutputDto> {
      return await new Promise(resolve => resolve(fixturesUserOutput()))
    }

    async updateUserConfirm (confirm: UpdateConfirmUserDto): Promise<void> {
      return await Promise.resolve()
    }
  }

  return new UserStub()
}

describe('UpdateUserConfirmationController', () => {
  it('Should call validation method with correct accessToken', async () => {
    const { sut, validationStub } = makeSut()
    const loadByTokenSpy = jest
      .spyOn(validationStub, 'validate')
    await sut.handle(fixturesUpdateUserConfirm())
    expect(loadByTokenSpy).toHaveBeenCalledWith({ confirmUser: true })
  })

  it('Should return 400 error if validate method return an error', async () => {
    const { sut, validationStub } = makeSut()
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingMandatoryParamError('confirmUser').serializeErrors())
    const expectedResponse = await sut.handle(fixturesUpdateUserConfirm())
    expect(expectedResponse).toEqual(badRequest(new MissingMandatoryParamError('confirmUser').serializeErrors()))
  })
})
