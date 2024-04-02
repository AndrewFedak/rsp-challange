import { v4 as uuid } from 'uuid';
import { Injectable, Provider } from '@nestjs/common';

import { User } from '../domain/User';

import {
  IUserRepository,
  USER_REPOSITORY_TOKEN,
} from 'src/users/domain/UserRepository';

import { UserDataModel } from './entity/user';

@Injectable()
export class UserRepository implements IUserRepository {
  newId() {
    return uuid();
  }
  async create(user: User) {
    const userData = UserDataModel.fromDomain(user);
    await UserDataModel.create(userData);
  }
  async findById(userId: string) {
    const userData = await UserDataModel.findById(userId);
    if (!userData) {
      return null;
    }
    return UserDataModel.toDomain(userData);
  }
  async findByName(name: string) {
    const userData = await UserDataModel.findOne({ name });
    if (!userData) {
      return null;
    }
    return UserDataModel.toDomain(userData);
  }
}

export const UserRepositoryImplement: Provider = {
  provide: USER_REPOSITORY_TOKEN,
  useClass: UserRepository,
};
