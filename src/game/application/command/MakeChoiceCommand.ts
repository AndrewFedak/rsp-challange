import { ICommand } from '@nestjs/cqrs';

import { GameChoice } from 'src/game/domain/player/Player';

export class MakeChoiceCommand implements ICommand {
  constructor(
    readonly gameId: string,
    readonly userId: string,
    readonly choice: GameChoice,
  ) {}
}
