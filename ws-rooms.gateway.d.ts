import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
export declare class WsRoomsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: any;
    handleConnection(client: any): any;
    handleDisconnect(client: any): any;
    handleCreateNewRoom(client: any, req: any): Promise<any>;
    handleConnectToRoom(client: any, req: any): Promise<any>;
    handleDisconnectFromRoom(client: any, req: any): Promise<any>;
}
