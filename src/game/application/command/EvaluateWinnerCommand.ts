import { ICommand } from '@nestjs/cqrs';

export class EvaluateWinnerCommand implements ICommand {
  constructor(readonly gameId: string) {}
}
