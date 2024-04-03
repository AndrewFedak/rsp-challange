import { Injectable, Provider } from '@nestjs/common';

import { PlayerDataModel } from 'libs/Database/entities/player';

import { Game } from 'src/game/domain/game/Game';
import { Player } from 'src/game/domain/player/Player';

import {
  IPlayerRepository,
  PLAYER_REPOSITORY_TOKEN,
} from 'src/game/domain/player/PlayerRepository';

@Injectable()
class PlayerRepository implements IPlayerRepository {
  async create(player: Player) {
    const playerData = PlayerDataModel.fromDomain(player.getSnapshot());
    await PlayerDataModel.create(playerData);
  }

  async save(player: Player) {
    const playerData = PlayerDataModel.fromDomain(player.getSnapshot());
    await PlayerDataModel.updateOne(
      { userId: playerData.userId, gameId: playerData.gameId },
      playerData,
    );
  }

  async find(game: Game, userId: string) {
    const gameSnapshot = game.getSnapshot();
    const player = await PlayerDataModel.findOne({
      gameId: gameSnapshot.id,
      userId,
    });

    if (!player) {
      return null;
    }

    return PlayerDataModel.toDomain(player);
  }
}

export const PlayerRepositoryImplement: Provider = {
  provide: PLAYER_REPOSITORY_TOKEN,
  useClass: PlayerRepository,
};
