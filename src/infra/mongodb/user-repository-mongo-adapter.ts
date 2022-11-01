import { IUserRepository } from '@/data/protocols/user-repository'
import { CreateUserOutputDto } from '@/presentation/dtos/user/create-user-output.dto'
import { CreateUserDto } from '@/presentation/dtos/user/create-user.dto'
import { MongoHelper } from './mongo-helper'

export class UserRepositoryMongoAdapter implements IUserRepository {
  async create (userDto: Omit<CreateUserDto, 'passwordConfirmation'>): Promise<CreateUserOutputDto> {
    const userCollection = MongoHelper.getCollection('users')
    const createUser = await userCollection.insertOne(userDto)
    const user = await userCollection.findOne(createUser.insertedId)
    return MongoHelper.map(user)
  }
}
