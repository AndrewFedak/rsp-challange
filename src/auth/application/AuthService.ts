import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AccessTokenData } from 'libs/Auth/types';
import { Transactional } from 'libs/Database/transaction';

import { UsersService } from 'src/users/application/UsersService';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Transactional()
  async signIn(username: string) {
    const foundUser = await this.usersService.findOne(username);
    const user = foundUser || (await this.usersService.create(username));
    const { name, id } = user.getSnapshot();
    const payload: AccessTokenData = { name, sub: id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
