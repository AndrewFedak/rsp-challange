import { UserSnapshot } from './UserSnapshot';

export class User {
  constructor(
    private id: string,
    private name: string,
  ) {}

  getSnapshot() {
    return new UserSnapshot(this.id, this.name);
  }
}
