import {
  Global,
  Injectable,
  Module,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import mongoose from 'mongoose';

@Injectable()
class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private connection: typeof mongoose;

  constructor(private configService: ConfigService) {}

  async onModuleInit(): Promise<void> {
    const mongoUser = this.configService.get<string>('MONGO_USER');
    const mongoPass = this.configService.get<string>('MONGO_PASSWORD');
    const mongoHost = this.configService.get<string>('MONGO_HOST');
    const mongoPort = this.configService.get<string>('MONGO_PORT');
    const mongoDbName = this.configService.get<string>('MONGO_DB_NAME');
    const connectStr = `mongodb://${mongoUser}:${mongoPass}@${mongoHost}:${mongoPort}/${mongoDbName}?authSource=admin`;

    try {
      this.connection = await mongoose.connect(connectStr);
      console.log('Successfully connected to database');
    } catch (e) {
      console.log('DataBase connection failed. exiting now...');
      console.error(e);
      process.exit(1);
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.connection.disconnect();
  }
}

@Global()
@Module({
  providers: [DatabaseService],
})
export class DatabaseModule {}
