import type { IValidation } from '@/presentation/protocols/validation'

export class ValidationComposite implements IValidation {
  constructor (
    private readonly validations: IValidation[]
  ) { }

  validate (input: any): Error | null {
    for (const validation of this.validations) {
      const isError = validation.validate(input)
      if (isError) {
        return isError
      }
    }
    return null
  }
}
