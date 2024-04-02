import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ErrorMessage } from 'src/game/domain/ErrorMessage';

import { GAME_QUERIES_TOKEN, IGameQueries } from './GameQueries';

import { FindGameByIdResult } from './FindGameByIdResult';
import { FindGameByIdQuery } from './FindGameById';

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
      throw new NotFoundException(ErrorMessage.GAME_IS_NOT_FOUND);
    }
    return data;
  }
}
