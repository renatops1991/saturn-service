import { IController } from '@/presentation/protocols/controller'
import { Request, Response, RequestHandler } from 'express'

export const expressRouteAdapter = (controller: IController): RequestHandler =>
  async (request: Request, response: Response) => {
    const httpRequest = {
      ...(request.body || {}),
      ...(request.params || {}),
      userId: request.userId
    }

    const httpResponse = await controller.handle(httpRequest)

    for (const successStatusCode of [200, 201, 204]) {
      if (httpResponse.statusCode === successStatusCode) {
        return response.status(httpResponse.statusCode).json(httpResponse.body)
      }
    }

    return response.status(httpResponse.statusCode).json({
      error: httpResponse.body
    })
  }
