import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
export declare class WsGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
    server: any;
    handleConnection(client: any, ...args: any[]): Promise<any>;
    emitMessage(message: string, data: any, client: any): void;
    handleDisconnect(client: any): any;
    afterInit(server: any): any;
}
