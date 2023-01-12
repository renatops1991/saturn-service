import { InvalidDateError } from '@/presentation/errors/invalid-date-error'
import type { IValidation } from '@/presentation/protocols/validation'

export class CompareDate implements IValidation {
  constructor (
    private readonly startDate: string,
    private readonly endDate: string
  ) {}

  validate <T = any>(input: T): Error | null {
    const convertStartDate = new Date(input[this.startDate])
    const convertEndDate = new Date(input[this.endDate])
    if (convertStartDate.getTime() > convertEndDate.getTime()) {
      return new InvalidDateError(this.startDate).serializeErrors()
    }
    return null
  }
}
