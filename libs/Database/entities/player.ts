import { Schema, model } from 'mongoose';

import {
  GameChoice,
  Player as PlayerEntity,
  PlayerStatus,
} from 'src/game/domain/player/Player';
import { PlayerSnapshot } from 'src/game/domain/player/PlayerSnapshot';

export interface IPlayer {
  gameId: string;
  userId: string;
  status: string;
  choice: string | null;
}

const playerSchema = new Schema<IPlayer>({
  gameId: { type: 'String' },
  userId: { type: 'String' },
  status: { type: 'String' },
  choice: { type: 'String' },
});
const Player = model<IPlayer>('Player', playerSchema);

export class PlayerDataModel extends Player {
  constructor(data: IPlayer) {
    super(data);
  }

  static toDomain({ gameId, userId, status, choice }: IPlayer): PlayerEntity {
    return new PlayerEntity(
      gameId,
      userId,
      status as PlayerStatus,
      choice as GameChoice,
    );
  }

  static fromDomain(playerSnapshot: PlayerSnapshot): IPlayer {
    return new Player<IPlayer>({
      gameId: playerSnapshot.gameId,
      userId: playerSnapshot.userId,
      status: playerSnapshot.status,
      choice: playerSnapshot.choice,
    });
  }
}
