import { ICommand } from '@nestjs/cqrs';

export class RestartGameCommand implements ICommand {
  constructor(readonly gameId: string) {}
}
