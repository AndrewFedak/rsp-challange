import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundGameException extends HttpException {
  constructor(gameId: string) {
    super(`Game not found with id: ${gameId}!`, HttpStatus.NOT_FOUND);
  }
}
