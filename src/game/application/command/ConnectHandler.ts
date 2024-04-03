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

import { ConnectCommand } from './ConnectCommand';

@CommandHandler(ConnectCommand)
export class ConnectHandler implements ICommandHandler<ConnectCommand, void> {
  @Inject(GAME_REPOSITORY_TOKEN)
  private readonly _gameRepository: IGameRepository;
  @Inject(PLAYER_REPOSITORY_TOKEN)
  private readonly _playerRepository: IPlayerRepository;

  async execute(command: ConnectCommand): Promise<void> {
    const game = await this._gameRepository.findById(command.gameId);
    const player = await this._playerRepository.find(game, command.userId);
    player.connect();
    await this._playerRepository.save(player);
  }
}
