import {
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway(4000, {
  cors: {
    origin: '*',
  },
})
export class GamesGateway implements OnGatewayDisconnect {
  private games: Map<number, Socket[]> = new Map<number, Socket[]>();

  @SubscribeMessage('disconnect')
  disconnect(client: Socket, payload: { blogId: number }): WsResponse<number> {
    return { event: 'events', data: 2 };
  }

  @SubscribeMessage('makeChoice')
  makeChoice(@MessageBody() data: any): WsResponse<number> {
    console.log(data);
    return { event: 'events', data: 2 };
  }

  @SubscribeMessage('connect')
  connect(client: Socket, payload: { blogId: number }) {
    console.log('entered', payload)
    const { blogId } = payload;
    const sockets = this.games.get(blogId) || [];
    sockets.push(client);
    this.games.set(blogId, sockets);
    console.log(`Client ${client.id} subscribed to blog ${blogId}`);
  }

  broadcastToGameSubscribers(blogId: number, message: any) {
    const sockets = this.games.get(blogId) || [];
    sockets.forEach((socket) => {
      socket.emit('blogUpdate', message);
    });
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
