import { Injectable, Provider } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Game } from 'src/game/domain/game/Game';

import {
  GAME_REPOSITORY_TOKEN,
  IGameRepository,
} from 'src/game/domain/game/GameRepository';

import { GameDataModel } from '../entities/game';
import { PlayerDataModel } from '../entities/player';

@Injectable()
class GameRepository implements IGameRepository {
  newId() {
    return uuidv4();
  }
  async create(game: Game) {
    const gameSnapshot = game.getSnapshot();
    const gameData = GameDataModel.fromDomain(gameSnapshot);
    const hostData = PlayerDataModel.fromDomain(gameSnapshot.host);
    await GameDataModel.create(gameData);
    await PlayerDataModel.create(hostData);
  }
  async findById(id: string) {
    const gameData = await GameDataModel.findById(id).exec();
    const host = await PlayerDataModel.findOne({
      userId: gameData.hostId,
      gameId: id,
    });
    const opponent = await PlayerDataModel.findOne({
      userId: gameData.opponentId,
      gameId: id,
    });
    const winner = await PlayerDataModel.findOne({
      userId: gameData.winnerId,
      gameId: id,
    });
    return GameDataModel.toDomain(gameData, host, opponent, winner);
  }
  async save(game: Game) {
    const gameData = GameDataModel.fromDomain(game.getSnapshot());
    await GameDataModel.updateOne({ _id: gameData._id }, gameData);
  }
}

export const GameRepositoryImplement: Provider = {
  provide: GAME_REPOSITORY_TOKEN,
  useClass: GameRepository,
};
