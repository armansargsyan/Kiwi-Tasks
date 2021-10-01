import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { BinanceService } from './binance/binance.service';

@WebSocketGateway({ namespace: 'assets' })
export class WsAssetsGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: any;

  constructor(private readonly binanceService: BinanceService) {}

  handleConnection(client: any, ...args: any[]): any {
    console.log(`${client.id} has been connected to Assets`);
  }

  handleDisconnect(client: any): any {
    console.log(`${client.id} has been disconnected from Assets`);
  }

  async afterInit(server: any): Promise<any> {
    await this.binanceService.subscribeStream((data) => {
      this.server.emit('assets', data);
    });
  }
}
