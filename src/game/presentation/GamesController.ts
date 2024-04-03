import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { UserId } from 'libs/Auth/decorators/user';

import { FindGameByIdRequestParam } from './dto/FindGameByIdRequestParam';
import { FindGameByIdResponseDto } from './dto/FindGameByIdResponseDto';

import { CreateGameResponseDto } from './dto/CreateGameResponseDto';
import { CreateGameRequestDto } from './dto/CreateGameRequestDto';
import { CreateGameCommand } from '../application/command/CreateGameCommand';

import { FindGameByIdQuery } from '../application/query/FindGameById';

@Controller()
export class GamesController {
  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
  ) {}

  @Post('games')
  async createGame(
    @UserId() userId: string,
    @Body() body: CreateGameRequestDto,
  ): Promise<CreateGameResponseDto> {
    const command = new CreateGameCommand(userId, body.opponentId);
    const game = await this.commandBus.execute(command);
    return CreateGameResponseDto.fromGame(game);
  }

  @Get('games/:gameId')
  async findGameById(
    @Param() param: FindGameByIdRequestParam,
  ): Promise<FindGameByIdResponseDto> {
    const query = new FindGameByIdQuery(param.gameId);
    return await this.queryBus.execute(query);
  }
}
