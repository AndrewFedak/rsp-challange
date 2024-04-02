import { ICommand } from '@nestjs/cqrs';

import { GameChoice } from 'src/game/domain/game/EvaluateWinner';

export class MakeChoiceCommand implements ICommand {
  constructor(
    readonly gameId: string,
    readonly userId: string,
    readonly choice: GameChoice,
  ) {}
}
