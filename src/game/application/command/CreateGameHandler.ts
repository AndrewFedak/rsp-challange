import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { Game } from 'src/game/domain/game/Game';
import { Player } from 'src/game/domain/player/Player';

import {
  GAME_REPOSITORY_TOKEN,
  IGameRepository,
} from 'src/game/domain/game/GameRepository';

import { CreateGameCommand } from './CreateGameCommand';

@CommandHandler(CreateGameCommand)
export class CreateGameHandler
  implements ICommandHandler<CreateGameCommand, Game>
{
  @Inject(GAME_REPOSITORY_TOKEN)
  private readonly _gameRepository: IGameRepository;

  async execute(command: CreateGameCommand): Promise<Game> {
    const newGameId = this._gameRepository.newId();
    const host = new Player(newGameId, command.hostId);
    const newGame = new Game(newGameId, host);
    await this._gameRepository.create(newGame);
    return newGame;
  }
}
