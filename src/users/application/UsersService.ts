import { Inject, Injectable } from '@nestjs/common';

import { User } from '../domain/User';

import {
  IUserRepository,
  USER_REPOSITORY_TOKEN,
} from '../domain/UserRepository';

@Injectable()
export class UsersService {
  @Inject(USER_REPOSITORY_TOKEN) private _userRepository: IUserRepository;

  async findOne(username: string): Promise<User | null> {
    return this._userRepository.findByName(username);
  }

  async create(username: string): Promise<User | null> {
    const newUserId = this._userRepository.newId();
    const newUser = new User(newUserId, username);
    await this._userRepository.create(newUser);
    return newUser;
  }
}
