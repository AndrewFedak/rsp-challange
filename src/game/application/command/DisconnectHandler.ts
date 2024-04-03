import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import {
  GAME_REPOSITORY_TOKEN,
  IGameRepository,
} from 'src/game/domain/game/GameRepository';
import {
  IPlayerRepository,
  PLAYER_REPOSITORY_TOKEN,
} from 'src/game/domain/player/PlayerRepository';

import { DisconnectCommand } from './DisconnectCommand';

@CommandHandler(DisconnectCommand)
export class DisconnectHandler
  implements ICommandHandler<DisconnectCommand, void>
{
  @Inject(GAME_REPOSITORY_TOKEN)
  private readonly _gameRepository: IGameRepository;
  @Inject(PLAYER_REPOSITORY_TOKEN)
  private readonly _playerRepository: IPlayerRepository;

  async execute(command: DisconnectCommand): Promise<void> {
    const game = await this._gameRepository.findById(command.gameId);
    game.reset();
    await this._gameRepository.save(game);

    const player = await this._playerRepository.find(game, command.userId);
    player.disconnect();
    await this._playerRepository.save(player);
  }
}
