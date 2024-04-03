import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { USER_STORED_PROP } from '../constants';
import { AccessTokenData } from '../types';

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return (request[USER_STORED_PROP] as AccessTokenData).sub;
  },
);
