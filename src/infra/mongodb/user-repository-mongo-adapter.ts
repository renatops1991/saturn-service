import { IUserRepository } from '@/data/protocols/user-repository'
import { MongoHelper } from './mongo-helper'
import {
  SignUpUserDto,
  LoadUserDto,
  UserOutputDto,
  UpdateConfirmUserDto,
  UpdateUserPasswordDto
} from '@/main/dtos/user'
import { UpdateUserOutputDto } from '@/main/dtos/user/update-user-output.dto'
import { UpdateUserDto } from '@/main/dtos/user/update-user.dto'
import { Collection, ObjectId } from 'mongodb'
import * as utils from '@/main/utils'

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

  async loadByToken (accessToken: string, role?: string): Promise<LoadUserDto> {
    const user = await this.getUserCollection().findOne({
      accessToken,
      $or: [
        { role },
        { role: 'admin' }
      ]
    }, {
      projection: {
        _id: 1
      }
    })

    return user && MongoHelper.map(user)
  }

  async updateConfirmUser (updateConfirmUserDto: UpdateConfirmUserDto): Promise<void> {
    const { confirmUser, userId } = updateConfirmUserDto
    await this.getUserCollection().findOneAndUpdate(
      {
        _id: new ObjectId(userId)
      },
      {
        $set: {
          confirmUser,
          updatedAt: new Date()
        }
      },
      {
        upsert: true
      }
    )
  }

  async update (updateUserDto: UpdateUserDto): Promise<UpdateUserOutputDto> {
    const { userId } = updateUserDto
    const updateUser = await this.getUserCollection().findOneAndUpdate(
      {
        _id: new ObjectId(userId)
      },
      {
        $set: utils.getFieldsWithValidValues(updateUserDto, 'userId')
      },
      {
        upsert: true,
        returnDocument: 'after',
        projection: {
          _id: 1,
          name: 1,
          birthDate: 1,
          address: 1,
          age: 1,
          phone: 1,
          type: 1,
          document: 1,
          createdAt: 1,
          updatedAt: 1
        }
      }
    )
    return MongoHelper.map(updateUser.value)
  }

  updateUserPassword: (redefineUserPasswordDto: UpdateUserPasswordDto) => Promise<void>

  private getUserCollection (): Collection {
    if (!this.userCollection) {
      this.userCollection = MongoHelper.getCollection('users')
    }

    return this.userCollection
  }
}
