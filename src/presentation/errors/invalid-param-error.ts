export class InvalidParamError extends Error {
  constructor (paramName: string) {
    super(`Invalid param error: ${paramName}`)
    this.name = 'InvalidParamError'
  }
}
