"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WsRoomsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
let WsRoomsGateway = class WsRoomsGateway {
    handleConnection(client) {
        console.log(`${client.id} has been connected to Rooms`);
    }
    handleDisconnect(client) {
        console.log(`${client.id} has been disconnected from Rooms`);
    }
    async handleCreateNewRoom(client, req) {
        if (!this.server.adapter.rooms.has(req.id) && client.rooms.size < 2) {
            client.join(req.id);
            client.emit('newRoom', { roomId: req.id });
        }
    }
    async handleConnectToRoom(client, req) {
        var _a;
        if (client.rooms.size < 2 &&
            ((_a = this.server.adapter.rooms.get(req.roomId)) === null || _a === void 0 ? void 0 : _a.size) < 2) {
            client.join(req.roomId);
            client.emit('connectToRoom', { roomId: req.roomId });
        }
    }
    async handleDisconnectFromRoom(client, req) {
        this.server.to(req.roomId).emit('roomClosed');
        this.server.adapter.rooms.get(req.roomId).forEach((id) => {
            this.server.sockets.get(id).leave(req.roomId);
        });
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], WsRoomsGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('createNewRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WsRoomsGateway.prototype, "handleCreateNewRoom", null);
__decorate([
    websockets_1.SubscribeMessage('connectToRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WsRoomsGateway.prototype, "handleConnectToRoom", null);
__decorate([
    websockets_1.SubscribeMessage('disconnectFromRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WsRoomsGateway.prototype, "handleDisconnectFromRoom", null);
WsRoomsGateway = __decorate([
    websockets_1.WebSocketGateway({ namespace: 'rooms' })
], WsRoomsGateway);
exports.WsRoomsGateway = WsRoomsGateway;
//# sourceMappingURL=ws-rooms.gateway.js.map