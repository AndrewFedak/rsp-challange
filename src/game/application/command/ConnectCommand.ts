import { ICommand } from '@nestjs/cqrs';

export class ConnectCommand implements ICommand {
  constructor(
    readonly gameId: string,
    readonly userId: string,
  ) {}
}
