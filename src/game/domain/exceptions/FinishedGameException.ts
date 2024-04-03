import { HttpException, HttpStatus } from '@nestjs/common';

export class FinishedGameException extends HttpException {
  constructor(gameId: string) {
    super(`Game (${gameId}) is finised!`, HttpStatus.BAD_REQUEST);
  }
}
