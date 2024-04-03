import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import {
  IGameRepository,
  GAME_REPOSITORY_TOKEN,
} from 'src/game/domain/game/GameRepository';

import { RestartGameCommand } from './RestartGameCommand';
import { NotFoundGameException } from 'src/game/domain/exceptions/NotFoundGameException';

@CommandHandler(RestartGameCommand)
export class RestartGameHandler
  implements ICommandHandler<RestartGameCommand, void>
{
  @Inject(GAME_REPOSITORY_TOKEN)
  private readonly _gameRepository: IGameRepository;

  async execute(command: RestartGameCommand): Promise<void> {
    const game = await this._gameRepository.findById(command.gameId);
    if (!game) {
      throw new NotFoundGameException(command.gameId);
    }

    game.restart();

    return await this._gameRepository.save(game);
  }
}
