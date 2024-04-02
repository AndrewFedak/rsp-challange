import { ICommand } from '@nestjs/cqrs';

export class JoinGameCommand implements ICommand {
  constructor(
    readonly gameId: string,
    readonly userId: string,
  ) {}
}
