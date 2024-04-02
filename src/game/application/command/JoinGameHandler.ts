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

import { JoinGameCommand } from './JoinGameCommand';

@CommandHandler(JoinGameCommand)
export class JoinGameHandler implements ICommandHandler<JoinGameCommand, void> {
  @Inject(GAME_REPOSITORY_TOKEN)
  private readonly _gameRepository: IGameRepository;
  @Inject(PLAYER_REPOSITORY_TOKEN)
  private readonly _playerRepository: IPlayerRepository;

  async execute(command: JoinGameCommand): Promise<void> {
    const game = await this._gameRepository.findById(command.gameId);
    if (!game) {
      throw new Error('Not found');
    }
    if (game.isRoomFull()) {
      throw new Error('Game is full');
    }

    const player = await this._playerRepository.find(game, command.userId)
    if (player && player.isEqual(game.getHost())) {
      throw new Error('Host is already in room')
    }

    game.setOpponent(command.userId);

    await this._gameRepository.save(game);
    await this._playerRepository.create(game.getOpponent());
  }
}
