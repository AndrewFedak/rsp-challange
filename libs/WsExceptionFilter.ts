import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Catch(WsException)
export class WsExceptionFilter implements ExceptionFilter {
  catch(exception: WsException, host: ArgumentsHost) {
    const ctx = host.switchToWs();
    const client = ctx.getClient();
    const event = client.event || '';

    const errorResponse = {
      event,
      error: exception.message || 'Internal server error',
    };

    client.emit('exception', errorResponse);
  }
}
