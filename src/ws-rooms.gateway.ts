import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'rooms' })
export class WsRoomsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: any;

  handleConnection(client: any, ...args: any[]): any {
    console.log(`${client.id} has been connected to Rooms`);
  }

  handleDisconnect(client: any): any {
    console.log(`${client.id} has been disconnected from Rooms`);
  }

  @SubscribeMessage('createNewRoom')
  async handleCreateNewRoom(client: any, req: any): Promise<any> {
    if (!this.server.adapter.rooms.has(req.id) && client.rooms.size < 2) {
      client.join(req.id);
      client.emit('newRoom', { roomId: req.id });
    }
  }
  @SubscribeMessage('connectToRoom')
  async handleConnectToRoom(client: any, req: any): Promise<any> {
    if (
      client.rooms.size < 2 &&
      this.server.adapter.rooms.get(req.roomId)?.size < 2
    ) {
      client.join(req.roomId);
      client.emit('connectToRoom', { roomId: req.roomId });
    }
  }

  @SubscribeMessage('disconnectFromRoom')
  async handleDisconnectFromRoom(client: any, req: any): Promise<any> {
    this.server.to(req.roomId).emit('roomClosed');
    this.server.adapter.rooms.get(req.roomId).forEach((id) => {
      this.server.sockets.get(id).leave(req.roomId);
    });
  }
}
