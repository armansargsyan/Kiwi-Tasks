"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const accounts_module_1 = require("./accounts/accounts.module");
const nestjs_twilio_1 = require("nestjs-twilio");
const todo_module_1 = require("./todo/todo.module");
const jwt_auth_service_1 = require("./jwt-auth/jwt-auth.service");
const jwt_1 = require("@nestjs/jwt");
const binance_module_1 = require("./binance/binance.module");
const ws_gateway_1 = require("./ws.gateway");
const serve_static_1 = require("@nestjs/serve-static");
const ws_assets_gateway_1 = require("./ws-assets.gateway");
const ws_rooms_gateway_1 = require("./ws-rooms.gateway");
let AppModule = class AppModule {
    configure(consumer) {
    }
};
AppModule = __decorate([
    common_1.Global(),
    common_1.Module({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: `${process.cwd()}/client`,
            }),
            typeorm_1.TypeOrmModule.forRoot(),
            accounts_module_1.AccountsModule,
            jwt_1.JwtModule.register({
                secret: 'jwtConstants.secret',
            }),
            nestjs_twilio_1.TwilioModule.forRoot({
                accountSid: 'ACe0f0688c733e77fca00c6afb99ac724e',
                authToken: 'dfe861253fc5ffdc38b7bcc8ef0412f3',
            }),
            todo_module_1.TodoModule,
            binance_module_1.BinanceModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            jwt_auth_service_1.JwtAuthService,
            ws_gateway_1.WsGateway,
            ws_assets_gateway_1.WsAssetsGateway,
            ws_rooms_gateway_1.WsRoomsGateway,
        ],
        exports: [typeorm_1.TypeOrmModule, jwt_auth_service_1.JwtAuthService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map