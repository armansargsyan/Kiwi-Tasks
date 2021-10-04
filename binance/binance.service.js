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
exports.BinanceService = void 0;
const common_1 = require("@nestjs/common");
const binance_provider_1 = require("./binance.provider");
let BinanceService = class BinanceService {
    constructor(binanceProvider) {
        this.binanceProvider = binanceProvider;
        this.getClient().then();
    }
    async getClient() {
        this.client = await this.binanceProvider.getClient('muLSdXnYSGnIA4Ghk7mrFBc4ZNvKwPCJ2SwL9eQAtBEhtDHR8acbj9tDvynmNrAM', 'QHUn7ItVOGM8Z8cNixDtdW4m1YaMoAtvFqMtHXBjGt0kpGjXrYN5zf05KlEvj6cs');
        return this.client;
    }
    async getAssetData() {
        try {
            let data;
            await this.client.prevDay().then((res) => {
                data = res;
            });
            return data;
        }
        catch (e) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Server Error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async subscribeStream(cb) {
        this.subscribe = await this.client.futuresTickerStream(cb);
        return this.subscribe;
    }
    unsubscribeStream() {
        console.log('is not working');
    }
};
BinanceService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [binance_provider_1.BinanceProvider])
], BinanceService);
exports.BinanceService = BinanceService;
//# sourceMappingURL=binance.service.js.map