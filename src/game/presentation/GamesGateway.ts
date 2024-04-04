import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { FindGameByIdQuery } from '../application/query/FindGameById';

import { DisconnectCommand } from '../application/command/DisconnectCommand';
import { ConnectCommand } from '../application/command/ConnectCommand';
import { RestartGameCommand } from '../application/command/RestartGameCommand';
import { MakeChoiceCommand } from '../application/command/MakeChoiceCommand';

import {
  DisconnectEventDto,
  DisconnectEventResponseDto,
} from './events/DisconnectEventDto';
import {
  ConnectEventDto,
  ConnectEventResponseDto,
} from './events/ConnectEventDto';
import {
  RestartEventDto,
  RestartEventResponseDto,
} from './events/RestartEventDto';
import {
  MakeChoiceEventDto,
  MakeChoiceEventResponseDto,
} from './events/MakeChoiceEventDto';

@WebSocketGateway(4000, {
  cors: {
    origin: '*',
  },
})
export class GamesGateway implements OnGatewayDisconnect {
  // TO IMPROVE: Introduce Message Broker (i.e RabbitMQ) to support horizontal scaling
  // Subscribe on rabbitmq topic and once subscribed event emmited, push it to appropriate socket client
  private games: Map<string, Socket[]> = new Map<string, Socket[]>();

  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
  ) {}

  @SubscribeMessage('disconnect')
  async disconnect(
    @MessageBody() data: DisconnectEventDto,
  ): Promise<DisconnectEventResponseDto> {
    const command = new DisconnectCommand(data.gameId, data.userId);
    await this.commandBus.execute(command);
    this.broadcastGameChange(data.gameId);
    return new DisconnectEventResponseDto('disconnect', 'Success');
  }

  @SubscribeMessage('connect')
  async connect(
    @MessageBody() data: ConnectEventDto,
    @ConnectedSocket() client: Socket,
  ): Promise<ConnectEventResponseDto> {
    const command = new ConnectCommand(data.gameId, data.userId);
    await this.commandBus.execute(command);
    this.broadcastGameChange(data.gameId);
    this.handleConnect(client, data.gameId);
    return new ConnectEventResponseDto('connect', 'Success');
  }

  @SubscribeMessage('restart')
  async restart(
    @MessageBody() data: RestartEventDto,
  ): Promise<RestartEventResponseDto> {
    const command = new RestartGameCommand(data.gameId);
    await this.commandBus.execute(command);
    this.broadcastGameChange(data.gameId);
    return new ConnectEventResponseDto('restart', 'Success');
  }

  @SubscribeMessage('makeChoice')
  async makeChoice(@MessageBody() data: MakeChoiceEventDto) {
    const command = new MakeChoiceCommand(
      data.gameId,
      data.userId,
      data.choice,
    );
    await this.commandBus.execute(command);
    this.broadcastGameChange(data.gameId);
    return new MakeChoiceEventResponseDto('makeChoice', 'Success');
  }

  async broadcastGameChange(gameId: string) {
    const query = new FindGameByIdQuery(gameId);
    const data = await this.queryBus.execute(query);
    const sockets = this.games.get(gameId) || [];
    sockets.forEach((socket) => {
      socket.emit('gameUpdate', data);
    });
  }

  handleConnect(client: Socket, gameId: string) {
    const sockets = this.games.get(gameId) || [];
    sockets.push(client);
    this.games.set(gameId, sockets);
  }

  handleDisconnect(client: Socket) {
    this.games.forEach((sockets, gameId) => {
      this.games.set(
        gameId,
        sockets.filter((socket) => socket.id !== client.id),
      );
    });
  }
}
