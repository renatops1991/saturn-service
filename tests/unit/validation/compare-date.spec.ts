import { InvalidDateError } from '@/presentation/errors/invalid-date-error'
import { CompareDate } from '@/validation/compare-date'

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
  it('Should return a InvalidDateError if validation fails', async () => {
    const { sut } = makeSut()
    const startDate = '2023-01-12'
    const endDate = '2023-01-10'
    const expectedError = sut.validate({
      startDate, endDate
    })
    expect(expectedError).toEqual(new InvalidDateError('startDate').serializeErrors())
    expect(expectedError.message).toEqual('startDate field cannot greater than endDate field')
  })
})
