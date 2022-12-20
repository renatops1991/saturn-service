import { IUser } from '@/domain/protocols/user'
import { IValidation } from '@/presentation/protocols/validation'
import { RedefineUserPassword } from '@/presentation/controllers/user/redefine-user-password'
import { mockValidation } from '@/tests/unit/presentation/mocks/mock-user-validation'
import { mockUserController } from '@/tests/unit/presentation/mocks/mock-user-controller'
import { fixtureRedefineUserPassword } from '@/tests/unit/presentation/fixtures/fixtures-user'

type SutTypes = {
  userRepositoryStub: IUser
  validationStub: IValidation
  sut: RedefineUserPassword
}

const makeSut = (): SutTypes => {
  const userRepositoryStub = mockUserController()
  const validationStub = mockValidation()
  const sut = new RedefineUserPassword(userRepositoryStub, validationStub)
  return {
    sut,
    userRepositoryStub,
    validationStub
  }
}
describe('RedefineUserPassword', () => {
  it('Should call validate method with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(fixtureRedefineUserPassword())
    const expectedResponse = fixtureRedefineUserPassword()
    expect(validateSpy).toHaveBeenCalledWith(expectedResponse)
  })
})
