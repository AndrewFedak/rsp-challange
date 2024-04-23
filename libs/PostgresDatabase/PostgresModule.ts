import { Global, Injectable, Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
class PostgresDatabaseService {
  public prisma = new PrismaClient();
}

@Global()
@Module({
  providers: [PostgresDatabaseService],
})
export class PostgresDatabaseModule {}
