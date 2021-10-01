import { BinanceService } from './binance.service';
export declare class BinanceController {
    private binanceService;
    constructor(binanceService: BinanceService);
    getUserData(): Promise<any>;
    getAssetData(): Promise<any>;
}
