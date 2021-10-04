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
exports.BinanceController = void 0;
const common_1 = require("@nestjs/common");
const binance_service_1 = require("./binance.service");
let BinanceController = class BinanceController {
    constructor(binanceService) {
        this.binanceService = binanceService;
    }
    async getAssetData() {
        return await this.binanceService.getAssetData();
    }
};
__decorate([
    common_1.Get('assets'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BinanceController.prototype, "getAssetData", null);
BinanceController = __decorate([
    common_1.Controller('binance'),
    __metadata("design:paramtypes", [binance_service_1.BinanceService])
], BinanceController);
exports.BinanceController = BinanceController;
//# sourceMappingURL=binance.controller.js.map