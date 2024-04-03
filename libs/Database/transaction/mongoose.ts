import mongoose, { ClientSession } from 'mongoose';

export class MongooseTransaction {
  private session: ClientSession;

  async startSession() {
    this.session = await mongoose.startSession();
    this.session.startTransaction();
  }

  async commit() {
    await this.session.commitTransaction();
    this.session.endSession();
  }

  async abort() {
    await this.session.abortTransaction();
    this.session.endSession();
  }

  getSession() {
    return this.session;
  }
}
