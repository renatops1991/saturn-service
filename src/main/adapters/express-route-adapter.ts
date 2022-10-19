import { Controller } from '@/presentation/protocols/controller'
import { Request, Response, RequestHandler } from 'express'

export const expressRouteAdapter = (controller: Controller): RequestHandler =>
  async (request: Request, response: Response) => {
    const httpRequest = {
      ...(request.body || {}),
      ...(request.params || {})
    }

    const httpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode === 200 || httpResponse.statusCode === 204) {
      response.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      response.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
