import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CreateGameHandler } from './application/command/CreateGameHandler';
import { EvaluateWinnerHandler } from './application/command/EvaluateWinnerHandler';
import { MakeChoiceHandler } from './application/command/MakeChoiceHandler';
import { RestartGameHandler } from './application/command/RestartGameHandler';

import { FindGameByIdHandler } from './application/query/FindGameByIdHandler';

import { GameRepositoryImplement } from './infrastructure/repository/GameRepositoryImplement';
import { GameQueryImplement } from './infrastructure/query/GameQueryImplement';

import { PlayerRepositoryImplement } from './infrastructure/repository/PlayerRepositoryImplement';

import { GamesController } from './presentation/GamesController';
import { GamesGateway } from './presentation/GamesGateway';

const infrastructure: Provider[] = [
  GameRepositoryImplement,
  GameQueryImplement,
  PlayerRepositoryImplement,
];

const application = [
  // Commands
  CreateGameHandler,
  EvaluateWinnerHandler,
  MakeChoiceHandler,
  RestartGameHandler,
  // Queries
  FindGameByIdHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [GamesController],
  providers: [Logger, GamesGateway, ...infrastructure, ...application],
})
export class GamesModule {}
