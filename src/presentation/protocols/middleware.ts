import { IHttpResponse } from './http'

export interface IMiddleware<T=any> {
  handle: (request: T) => Promise<IHttpResponse>
}
