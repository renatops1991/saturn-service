import { InvalidDateError } from '@/presentation/errors/invalid-date-error'
import { CompareDate } from '@/validation/compare-date'
import MockDate from 'mockdate'

type SutTypes = {
  sut: CompareDate
}

const makeSut = (): SutTypes => {
  const sut = new CompareDate('startDate', 'endDate')
  return {
    sut
  }
}

describe('CompareDate', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })

  it('Should return a InvalidDateError if validation fails', async () => {
    const { sut } = makeSut()
    const startDate = '2023-01-12'
    const endDate = '2023-01-10'
    const expectedError = sut.validate({
      startDate, endDate
    })
    expect(expectedError).toEqual(new InvalidDateError('startDate').serializeErrors())
    expect(expectedError?.message).toEqual('startDate field cannot greater than endDate field')
  })

  it('Should return null if validation on succeeds', async () => {
    const { sut } = makeSut()
    const startDate = '2023-01-12'
    const endDate = '2023-01-13'
    const expectedError = sut.validate({
      startDate, endDate
    })
    expect(expectedError).toBeNull()
  })
})
