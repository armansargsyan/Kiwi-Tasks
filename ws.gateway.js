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
exports.WsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
let WsGateway = class WsGateway {
    async handleConnection(client, ...args) {
        console.log(`${client.id} has been connected`);
    }
    emitMessage(message, data, client) {
        client.emit(message, data);
    }
    handleDisconnect(client) {
        console.log(`${client.id} has been disconnected`);
    }
    afterInit(server) {
        console.log('init');
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], WsGateway.prototype, "server", void 0);
WsGateway = __decorate([
    websockets_1.WebSocketGateway({
        cors: {
            origin: 'http://localhost:4200',
        },
    })
], WsGateway);
exports.WsGateway = WsGateway;
//# sourceMappingURL=ws.gateway.js.map