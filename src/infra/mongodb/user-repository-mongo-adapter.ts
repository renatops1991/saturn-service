import { IUserRepository } from '@/data/protocols/user-repository'
import { MongoHelper } from './mongo-helper'
import { SignUpUserDto, LoadUserDto, UserOutputDto } from '@/main/dtos/user'
import { Collection } from 'mongodb'

export class UserRepositoryMongoAdapter implements IUserRepository {
  private userCollection: Collection

  async create (userDto: Omit<SignUpUserDto, 'passwordConfirmation'>): Promise<UserOutputDto> {
    const createUser = await this.getUserCollection().insertOne(userDto)
    const user = await this.getUserCollection().findOne(
      { _id: createUser.insertedId },
      {
        projection: {
          name: 1,
          email: 1
        }
      })
    return MongoHelper.map(user)
  }

  async loadByEmail (email: string): Promise<LoadUserDto> {
    const user = await this.getUserCollection().findOne(
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
    await this.getUserCollection().updateOne(
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

  async loadByToken (accessToken: string, role?: string): Promise<Partial<LoadUserDto>> {
    const user = await this.getUserCollection().findOne({
      accessToken,
      $or: [
        { role },
        { role: 'admin' }
      ]
    }, {
      projection: {
        _id: 1,
        name: 1,
        email: 1
      }
    })

    return user && MongoHelper.map(user)
  }

  private getUserCollection (): Collection {
    if (!this.userCollection) {
      this.userCollection = MongoHelper.getCollection('users')
    }

    return this.userCollection
  }
}
