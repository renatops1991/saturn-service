import { IUserRepository } from '@/data/protocols/user-repository'
import { MongoHelper } from './mongo-helper'
import { SignUpUserDto, LoadUserDto, UserOutputDto, UpdateConfirmUserDto } from '@/main/dtos/user'
import { Collection, ObjectId } from 'mongodb'
import { UpdateUserOutputDto } from '@/main/dtos/user/update-user-output.dto'
import { UpdateUserDto } from '@/main/dtos/user/update-user.dto'

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
    await this.getUserCollection().findOneAndUpdate(
      {
        _id: new ObjectId(userId)
      },
      {
        $set: {
          name: updateUserDto.name,
          birthDate: updateUserDto.birthDate,
          age: updateUserDto.age,
          address: updateUserDto.address,
          phone: updateUserDto.phone,
          type: updateUserDto.type,
          document: updateUserDto.document,
          password: updateUserDto.password,
          updatedAt: new Date()
        }
      },
      {
        upsert: true
      }
    )

    const updateUser = await this.getUserCollection().findOne(
      { _id: userId },
      {
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
    return MongoHelper.map(updateUser)
  }

  private getUserCollection (): Collection {
    if (!this.userCollection) {
      this.userCollection = MongoHelper.getCollection('users')
    }

    return this.userCollection
  }
}
