import type { IHttpResponse } from './http'

export interface IController<T = any> {
  handle: (request: T) => Promise<IHttpResponse>
}
