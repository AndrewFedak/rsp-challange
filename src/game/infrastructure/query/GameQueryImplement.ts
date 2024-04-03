import { Injectable } from '@nestjs/common';

import { GameDataModel } from 'libs/Database/entities/game';

import { FindGameByIdResult } from 'src/game/application/query/FindGameByIdResult';

import {
  GAME_QUERIES_TOKEN,
  IGameQueries,
} from 'src/game/application/query/GameQueries';

@Injectable()
class GameQueries implements IGameQueries {
  async getById(id: string): Promise<FindGameByIdResult | null> {
    const gameDbResult = await GameDataModel.aggregate([
      { $match: { _id: id } },
      {
        $lookup: {
          from: 'players',
          localField: 'hostId',
          foreignField: 'userId',
          as: 'host',
        },
      },
      { $unwind: { path: '$host', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'players',
          localField: 'opponentId',
          foreignField: 'userId',
          as: 'opponent',
        },
      },
      { $unwind: { path: '$opponent', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'players',
          localField: 'winnerId',
          foreignField: 'userId',
          as: 'winner',
        },
      },
      { $unwind: { path: '$winner', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 1,
          host: '$host',
          opponent: {
            $cond: [
              { $eq: ['$opponent._id', null] }, // Check if opponent is null
              null,
              '$opponent',
            ],
          },
          winner: '$winner',
          state: 1,
        },
      },
    ]);
    if (!gameDbResult[0]) {
      return null;
    }
    const gameDb = gameDbResult[0];
    const game = new FindGameByIdResult();
    game.id = gameDb.id;
    game.host = gameDb.host;
    game.opponent = gameDb.opponent || null;
    game.winner = gameDb.winner || null;
    game.state = gameDb.state;
    return game;
  }
}

export const GameQueryImplement = {
  provide: GAME_QUERIES_TOKEN,
  useClass: GameQueries,
};
