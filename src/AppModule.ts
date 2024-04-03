import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from 'libs/Database/DatabaseModule';

import { GamesModule } from './game/GamesModule';
import { AuthModule } from './auth/AuthModule';

@Module({
  imports: [
    DatabaseModule,
    GamesModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
