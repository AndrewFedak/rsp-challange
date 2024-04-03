import { HttpException, HttpStatus } from '@nestjs/common';

export class InProgressGameException extends HttpException {
  constructor() {
    super(`Game is in progress!`, HttpStatus.BAD_REQUEST);
  }
}
