import { Module } from '@nestjs/common';

import { DatabaseModule } from 'libs/DatabaseModule';

import { UsersService } from './application/UsersService';
import { UserRepositoryImplement } from './infrastructure/UserRepositoryImplement';

@Module({
  imports: [DatabaseModule],
  providers: [UserRepositoryImplement, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
