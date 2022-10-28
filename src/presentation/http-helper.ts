import { ServerError } from './errors/server-error'
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
