export class MissingMandatoryParamError extends Error {
  constructor (paramName: string) {
    super(`Missing mandatory parameter: ${paramName}`)
    this.name = 'MissingMandatoryParamError'
  }
}
