import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CreateGameHandler } from './application/command/CreateGameHandler';
import { MakeChoiceHandler } from './application/command/MakeChoiceHandler';
import { RestartGameHandler } from './application/command/RestartGameHandler';
import { DisconnectHandler } from './application/command/DisconnectHandler';
import { ConnectHandler } from './application/command/ConnectHandler';

import { FindGameByIdHandler } from './application/query/FindGameByIdHandler';

import { GameRepositoryImplement } from './infrastructure/repository/GameRepositoryImplement';
import { GameQueryImplement } from './infrastructure/query/GameQueryImplement';

import { PlayerRepositoryImplement } from './infrastructure/repository/PlayerRepositoryImplement';

import { GamesController } from './presentation/GamesController';
import { GamesGateway } from './presentation/GamesGateway';
import { ChoiceMadeHandelr } from './application/event/ChoiceMadeHandler';

const infrastructure: Provider[] = [
  GameRepositoryImplement,
  GameQueryImplement,
  PlayerRepositoryImplement,
];

const application = [
  // Commands
  CreateGameHandler,
  MakeChoiceHandler,
  RestartGameHandler,
  DisconnectHandler,
  ConnectHandler,
  // Queries
  FindGameByIdHandler,
  // Events
  ChoiceMadeHandelr,
];

@Module({
  imports: [CqrsModule],
  controllers: [GamesController],
  providers: [Logger, GamesGateway, ...infrastructure, ...application],
})
export class GamesModule {}
