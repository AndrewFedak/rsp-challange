import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { EvaluateWinner } from 'src/game/domain/game/EvaluateWinner';

import {
  GAME_REPOSITORY_TOKEN,
  IGameRepository,
} from 'src/game/domain/game/GameRepository';

import { EvaluateWinnerCommand } from './EvaluateWinnerCommand';

@CommandHandler(EvaluateWinnerCommand)
export class EvaluateWinnerHandler
  implements ICommandHandler<EvaluateWinnerCommand, void>
{
  @Inject(GAME_REPOSITORY_TOKEN)
  private readonly _gameRepository: IGameRepository;

  async execute(command: EvaluateWinnerCommand): Promise<void> {
    const game = await this._gameRepository.findById(command.gameId);
    if (!game) {
      throw new Error('Not found');
    }

    const player1 = game.getHost();
    const player2 = game.getOpponent();

    const winner = EvaluateWinner.execute(player1, player2);

    game.setWinner(winner);

    return await this._gameRepository.save(game);
  }
}
