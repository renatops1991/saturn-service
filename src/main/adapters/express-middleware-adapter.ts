import type { IMiddleware } from '@/presentation/protocols/middleware'
import type { Request, Response, NextFunction, RequestHandler } from 'express'

export const expressMiddlewareAdapter = (middleware: IMiddleware): RequestHandler =>
  async (request: Request, response: Response, next: NextFunction) => {
    const httpRequest = {
      accessToken: request.headers?.['x-access-token'],
      ...(request.headers || {})
    }

    const httpResponse = await middleware.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      Object.assign(request, httpResponse.body)
      next()
    } else {
      return response.status(httpResponse.statusCode).json({
        error: httpResponse.body
      })
    }
  }
