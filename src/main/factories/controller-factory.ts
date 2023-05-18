import { MetadataKeys } from '../enum/metadata-keys'

export enum Methods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete'
}
export interface IRouter {
  method: Methods
  path: string
  handlerName: string | symbol
}

const ControllerDecorator = (method: Methods) => {
  return (path: string): MethodDecorator => {
    return (target, propertyKey) => {
      const classController = target.constructor
      const routers: IRouter[] =
                Reflect.hasMetadata(MetadataKeys.ROUTERS, classController)
                  ? Reflect.getMetadata(MetadataKeys.ROUTERS, classController)
                  : []
      routers.push({
        method,
        path,
        handlerName: propertyKey
      })

      Reflect.defineMetadata(MetadataKeys.ROUTERS, routers, classController)
    }
  }
}

export const Get = ControllerDecorator(Methods.GET)
export const Post = ControllerDecorator(Methods.POST)
export const Put = ControllerDecorator(Methods.PUT)
export const Patch = ControllerDecorator(Methods.PATCH)
export const Delete = ControllerDecorator(Methods.DELETE)
