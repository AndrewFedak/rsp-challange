import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { jwtConstants } from 'libs/Auth/constants';
import { AuthGuard } from 'libs/Auth/guards/auth';

import { AuthService } from './application/AuthService';
import { AuthController } from './presentation/AuthController';

import { UsersModule } from 'src/users/UsersModule';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
