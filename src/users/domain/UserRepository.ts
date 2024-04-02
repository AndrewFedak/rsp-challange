import { User } from './User';

export const USER_REPOSITORY_TOKEN = 'USER_REPOSITORY_TOKEN';

export interface IUserRepository {
  newId: () => string;
  findById: (userId: string) => Promise<User | null>;
  findByName: (userId: string) => Promise<User | null>;
  create: (user: User) => Promise<void>;
}
