import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';

import { Public } from 'libs/Auth/decorators/public';

import { SignInDto } from './dto/SignInDto';

import { AuthService } from '../application/AuthService';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login-or-register')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.name);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
