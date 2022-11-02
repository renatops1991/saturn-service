import { ServerError } from './errors/server-error'
import { UnauthorizedError } from './errors/unauthorized-error'
import { IHttpResponse } from './protocols/http'

export const badRequest = (error: Error): IHttpResponse => ({
  statusCode: 400,
  body: error
})

export const serverError = (error: Error): IHttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack).serializeErrors()
})

export const success = <T= any>(data: T): IHttpResponse => ({
  statusCode: 200,
  body: data
})

export const unauthorized = (): IHttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError().serializeErrors()
})
