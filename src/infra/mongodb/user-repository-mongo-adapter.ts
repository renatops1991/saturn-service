import { IUserRepository } from '@/data/protocols/user-repository'
import { UserOutputDto } from '@/presentation/dtos/user/user-output.dto'
import { CreateUserDto } from '@/presentation/dtos/user/create-user.dto'
import { MongoHelper } from './mongo-helper'

export class UserRepositoryMongoAdapter implements IUserRepository {
  async create (userDto: Omit<CreateUserDto, 'passwordConfirmation'>): Promise<UserOutputDto> {
    const userCollection = MongoHelper.getCollection('users')
    const createUser = await userCollection.insertOne(userDto)
    const user = await userCollection.findOne(createUser.insertedId)
    delete user.password
    return MongoHelper.map(user)
  }

  loadByEmail: (email: string) => Promise<UserOutputDto>
}
