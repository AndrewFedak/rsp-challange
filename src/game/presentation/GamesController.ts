import { Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { UserId } from 'libs/Auth/decorators/user';

import { FindGameByIdRequestParam } from './dto/FindGameByIdRequestParam';
import { FindGameByIdResponseDto } from './dto/FindGameByIdResponseDto';

import { CreateGameResponseDto } from './dto/CreateGameResponseDto';
import { CreateGameCommand } from '../application/command/CreateGameCommand';

import { JoinGameRequestParam } from './dto/JoinGameRequestParam';
import { JoinGameCommand } from '../application/command/JoinGameCommand';

import { FindGameByIdQuery } from '../application/query/FindGameById';

@Controller()
export class GamesController {
  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
  ) {}

  @Post('games')
  async createGame(@UserId() userId: string): Promise<CreateGameResponseDto> {
    const command = new CreateGameCommand(userId);
    const game = await this.commandBus.execute(command);
    return CreateGameResponseDto.fromGame(game);
  }

  @Post('games/:gameId/join')
  async joinGame(
    @Param() param: JoinGameRequestParam,
    @UserId() userId: string,
  ): Promise<void> {
    const command = new JoinGameCommand(param.gameId, userId);
    await this.commandBus.execute(command);
  }

  @Get('games/:gameId')
  async findGameById(
    @Param() param: FindGameByIdRequestParam,
  ): Promise<FindGameByIdResponseDto> {
    console.log('Here');
    const query = new FindGameByIdQuery(param.gameId);
    const data = await this.queryBus.execute(query);
    return data;
  }
}
