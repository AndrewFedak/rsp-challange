import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { FinishedGameException } from 'src/game/domain/exceptions/FinishedGameException';

import {
  IGameRepository,
  GAME_REPOSITORY_TOKEN,
} from 'src/game/domain/game/GameRepository';
import {
  IPlayerRepository,
  PLAYER_REPOSITORY_TOKEN,
} from 'src/game/domain/player/PlayerRepository';

import { MakeChoiceCommand } from './MakeChoiceCommand';
import { NotFoundGameException } from 'src/game/domain/exceptions/NotFoundGameException';

@CommandHandler(MakeChoiceCommand)
export class MakeChoiceHandler
  implements ICommandHandler<MakeChoiceCommand, void>
{
  @Inject(GAME_REPOSITORY_TOKEN)
  private readonly _gameRepository: IGameRepository;
  @Inject(PLAYER_REPOSITORY_TOKEN)
  private readonly _playerRepository: IPlayerRepository;

  async execute(command: MakeChoiceCommand): Promise<void> {
    const game = await this._gameRepository.findById(command.gameId);
    if (!game) {
      throw new NotFoundGameException(command.gameId);
    }
    if (game.isFinished()) {
      throw new FinishedGameException(command.gameId);
    }
    const player = await this._playerRepository.find(game, command.userId);

    player.setChoice(command.choice);

    await this._playerRepository.save(player);

    player.commit();
  }
}
