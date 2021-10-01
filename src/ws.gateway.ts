import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:4200',
  },
})
export class WsGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: any;

  async handleConnection(client: any, ...args: any[]): Promise<any> {
    console.log(`${client.id} has been connected`);
  }

  emitMessage(message: string, data: any, client: any): void {
    client.emit(message, data);
  }

  handleDisconnect(client: any): any {
    console.log(`${client.id} has been disconnected`);
  }

  afterInit(server: any): any {
    console.log('init');
  }
}
