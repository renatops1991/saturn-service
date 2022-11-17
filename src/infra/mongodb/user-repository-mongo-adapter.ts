import { IUserRepository } from '@/data/protocols/user-repository'
import { UserOutputDto } from '@/presentation/dtos/user/user-output.dto'
import { CreateUserDto } from '@/presentation/dtos/user/create-user.dto'
import { MongoHelper } from './mongo-helper'
import { LoadUserDto } from '@/presentation/dtos/user/load-user.dto'

export class UserRepositoryMongoAdapter implements IUserRepository {
  async create (userDto: Omit<CreateUserDto, 'passwordConfirmation'>): Promise<UserOutputDto> {
    const userCollection = MongoHelper.getCollection('users')
    const createUser = await userCollection.insertOne(userDto)
    const user = await userCollection.findOne(
      { _id: createUser.insertedId },
      {
        projection: {
          _id: 1,
          name: 1,
          email: 1
        }
      })
    return MongoHelper.map(user)
  }

  async loadByEmail (email: string): Promise<LoadUserDto> {
    const userCollection = MongoHelper.getCollection('users')
    const user = await userCollection.findOne({ email },
      {
        projection: {
          _id: 1,
          name: 1,
          email: 1,
          password: 1
        }
      })
    return user && MongoHelper.map(user)
  }

  updateAccessToken: (userId: string, token: string) => Promise<void>
}
