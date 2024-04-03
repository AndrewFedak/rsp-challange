import { ICommand } from '@nestjs/cqrs';

export class CreateGameCommand implements ICommand {
  constructor(
    readonly hostId: string,
    readonly opponentId: string,
  ) {}
}
