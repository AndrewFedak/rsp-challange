import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CreateGameHandler } from './application/command/CreateGameHandler';
import { EvaluateWinnerHandler } from './application/command/EvaluateWinnerHandler';
import { JoinGameHandler } from './application/command/JoinGameHandler';
import { MakeChoiceHandler } from './application/command/MakeChoiceHandler';
import { RestartGameHandler } from './application/command/RestartGameHandler';

import { FindGameByIdHandler } from './application/query/FindGameByIdHandler';

import { GameRepositoryImplement } from './infrastructure/repository/GameRepositoryImplement';
import { GameQueryImplement } from './infrastructure/query/GameQueryImplement';

import { PlayerRepositoryImplement } from './infrastructure/repository/PlayerRepositoryImplement';

import { GamesController } from './presentation/GamesController';

const infrastructure: Provider[] = [
  GameRepositoryImplement,
  GameQueryImplement,
  PlayerRepositoryImplement,
];

const application = [
  // Commands
  CreateGameHandler,
  EvaluateWinnerHandler,
  JoinGameHandler,
  MakeChoiceHandler,
  RestartGameHandler,
  // Queries
  FindGameByIdHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [GamesController],
  providers: [Logger, ...infrastructure, ...application],
})
export class GamesModule {}
