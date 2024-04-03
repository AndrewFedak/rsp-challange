import { connection } from 'mongoose';

export function Transactional() {
  return (target: any, key: string, descriptor: PropertyDescriptor): void => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const session = await connection.startSession();
      session.startTransaction();
      try {
        const result = await originalMethod.apply(this, args);
        await session.commitTransaction();
        session.endSession();
        return result;
      } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
      }
    };
  };
}
