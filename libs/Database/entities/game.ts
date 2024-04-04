import { Schema, model } from 'mongoose';

import { Game as GameEntity } from 'src/game/domain/game/Game';

import { IPlayer, PlayerDataModel } from './player';
import { GameSnapshot } from 'src/game/domain/game/GameSnapshot';

interface IGame {
  _id: string;
  hostId: string;
  opponentId: string | null;
  winnerId: string | null;
}

const gameSchema = new Schema<IGame>({
  _id: { type: 'String' },
  hostId: { type: 'String' },
  opponentId: { type: 'String' },
  winnerId: { type: 'String' },
});
const Game = model<IGame>('Game', gameSchema);

export class GameDataModel extends Game {
  constructor(data: IGame) {
    super(data);
  }

  static toDomain(
    game: IGame,
    host: IPlayer,
    opponent: IPlayer | null,
    winner: IPlayer | null,
  ): GameEntity {
    return new GameEntity(
      game._id,
      PlayerDataModel.toDomain(host),
      PlayerDataModel.toDomain(opponent),
      winner ? PlayerDataModel.toDomain(winner) : null,
    );
  }

  static fromDomain(gameSnapshot: GameSnapshot): IGame {
    return new Game<IGame>({
      _id: gameSnapshot.id,
      hostId: gameSnapshot.host.userId,
      opponentId: gameSnapshot.opponent?.userId,
      winnerId: gameSnapshot.winner?.userId,
    });
  }
}
