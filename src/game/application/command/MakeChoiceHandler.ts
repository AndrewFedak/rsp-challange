import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import {
  IGameRepository,
  GAME_REPOSITORY_TOKEN,
} from 'src/game/domain/game/GameRepository';
import {
  IPlayerRepository,
  PLAYER_REPOSITORY_TOKEN,
} from 'src/game/domain/player/PlayerRepository';

import { MakeChoiceCommand } from './MakeChoiceCommand';

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
      throw new Error('Not found');
    }
    if (game.isFinished()) {
      throw new Error("Can't change. Please reset game");
    }
    const player = await this._playerRepository.find(game, command.userId);

    player.setChoice(command.choice);

    await this._playerRepository.save(player);
  }
}
