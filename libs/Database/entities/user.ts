import { Schema, model } from 'mongoose';

import { User as UserEntity } from 'src/users/domain/User';

interface IUser {
  _id: string;
  name: string;
}

const userSchema = new Schema<IUser>({
  _id: { type: 'String' },
  name: { type: 'String' },
});
const User = model<IUser>('User', userSchema);

export class UserDataModel extends User {
  constructor(data: IUser) {
    super(data);
  }

  static toDomain({ _id, name }: IUser): UserEntity {
    return new UserEntity(_id, name);
  }

  static fromDomain(user: UserEntity): IUser {
    const userSnapshot = user.getSnapshot();
    return new User<IUser>({ _id: userSnapshot.id, name: userSnapshot.name });
  }
}
