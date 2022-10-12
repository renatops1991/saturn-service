import { UserRepository } from '@/data/protocols/user-repository'
import { CreateUserOutputDto } from '@/presentation/dtos/user/create-user-output.dto'
import { CreateUserDto } from '@/presentation/dtos/user/create-user.dto'
import { MongoConnect } from './mongo-helper'
import { Collection } from 'mongodb'

export class UserRepositoryMongoAdapter implements UserRepository {
  private readonly userCollection: Collection = MongoConnect.getCollection('users')
  async create (userDto: Omit<CreateUserDto, 'passwordConfirmation'>): Promise<CreateUserOutputDto> {
    const createUser = await this.userCollection.insertOne(userDto)
    const user = await this.userCollection.findOne(createUser.insertedId)
    return MongoConnect.map(user)
  }
}
