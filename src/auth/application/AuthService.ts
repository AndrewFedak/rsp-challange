import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AccessTokenPayload } from 'libs/Auth/types';

import { UsersService } from 'src/users/application/UsersService';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string) {
    const foundUser = await this.usersService.findOne(username);
    const user = foundUser || (await this.usersService.create(username));
    const { name, id } = user.getSnapshot();
    const payload: AccessTokenPayload = { name, sub: id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
