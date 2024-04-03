import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GAME_QUERIES_TOKEN, IGameQueries } from './GameQueries';

import { FindGameByIdResult } from './FindGameByIdResult';
import { FindGameByIdQuery } from './FindGameById';
import { NotFoundGameException } from 'src/game/domain/exceptions/NotFoundGameException';

@QueryHandler(FindGameByIdQuery)
export class FindGameByIdHandler
  implements IQueryHandler<FindGameByIdQuery, FindGameByIdResult>
{
  constructor(
    @Inject(GAME_QUERIES_TOKEN) private readonly _gameQuery: IGameQueries,
  ) {}

  async execute(query: FindGameByIdQuery): Promise<FindGameByIdResult> {
    const data = await this._gameQuery.getById(query.id);
    if (!data) {
      throw new NotFoundGameException(query.id);
    }
    return data;
  }
}
