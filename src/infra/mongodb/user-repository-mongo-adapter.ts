import { IUserRepository } from '@/data/protocols/user-repository'
import { UserOutputDto } from '@/presentation/dtos/user/user-output.dto'
import { CreateUserDto } from '@/presentation/dtos/user/create-user.dto'
import { MongoHelper } from './mongo-helper'
import { LoadUserDto } from '@/presentation/dtos/user/load-user.dto'
import { Collection } from 'mongodb'

export class UserRepositoryMongoAdapter implements IUserRepository {
  private readonly userCollection: Collection
  constructor () {
    if (!this.userCollection) {
      this.userCollection = MongoHelper.getCollection('users')
    }
  }

  async create (userDto: Omit<CreateUserDto, 'passwordConfirmation'>): Promise<UserOutputDto> {
    const createUser = await this.userCollection.insertOne(userDto)
    const user = await this.userCollection.findOne(
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
    const user = await this.userCollection.findOne(
      { email },
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

  async updateAccessToken (userId: string, token: string): Promise<void> {
    await this.userCollection.updateOne(
      {
        _id: userId
      },
      {
        $set: {
          accessToken: token
        }
      }
    )
  }
}
