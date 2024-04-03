import { ICommand } from '@nestjs/cqrs';

export class DisconnectCommand implements ICommand {
  constructor(
    readonly gameId: string,
    readonly userId: string,
  ) {}
}
