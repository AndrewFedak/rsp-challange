import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { EvaluateWinner } from 'src/game/domain/game/EvaluateWinner';

import {
  GAME_REPOSITORY_TOKEN,
  IGameRepository,
} from 'src/game/domain/game/GameRepository';

import { GamesGateway } from 'src/game/presentation/GamesGateway';

import { ChoiceMadeEvent } from './ChoiceMadeEvent';

@EventsHandler(ChoiceMadeEvent)
export class ChoiceMadeHandelr implements IEventHandler<ChoiceMadeEvent> {
  @Inject(GAME_REPOSITORY_TOKEN)
  private readonly _gameRepository: IGameRepository;
  @Inject()
  private readonly _gamesGateway: GamesGateway;

  async handle(command: ChoiceMadeEvent) {
    const game = await this._gameRepository.findById(command.gameId);
    const player1 = game.getHost();
    const player2 = game.getOpponent();

    const winner = EvaluateWinner.execute(player1, player2);

    game.setWinner(winner);

    await this._gameRepository.save(game);
    await this._gamesGateway.broadcastGameChange(command.gameId);
  }
}
