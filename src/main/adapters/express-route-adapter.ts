import { IController } from '@/presentation/protocols/controller'
import { Request, Response, RequestHandler } from 'express'

export const expressRouteAdapter = (controller: IController): RequestHandler =>
  async (request: Request, response: Response) => {
    const httpRequest = {
      ...(request.body || {}),
      ...(request.params || {})
    }

    const httpResponse = await controller.handle(httpRequest)

    const successStatusesCode: number [] = [200, 201, 204]
    for (const statusCode of successStatusesCode) {
      if (httpResponse.statusCode === statusCode) {
        return response.status(httpResponse.statusCode).json(httpResponse.body)
      }
    }

    return response.status(httpResponse.statusCode).json({
      error: httpResponse.body
    })
  }
