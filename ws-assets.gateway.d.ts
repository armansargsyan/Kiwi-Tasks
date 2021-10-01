import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { BinanceService } from './binance/binance.service';
export declare class WsAssetsGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
    private readonly binanceService;
    server: any;
    constructor(binanceService: BinanceService);
    handleConnection(client: any, ...args: any[]): any;
    handleDisconnect(client: any): any;
    afterInit(server: any): Promise<any>;
}
