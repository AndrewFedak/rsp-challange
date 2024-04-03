import { HttpException, HttpStatus } from '@nestjs/common';

export class PlayerChoiceNotMadeException extends HttpException {
  constructor() {
    super(`Both players should choose!`, HttpStatus.BAD_REQUEST);
  }
}
