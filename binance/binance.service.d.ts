import { BinanceProvider } from './binance.provider';
export declare class BinanceService {
    private binanceProvider;
    client: any;
    subscribe: any;
    constructor(binanceProvider: BinanceProvider);
    getClient(): Promise<any>;
    getAssetData(): Promise<any>;
    subscribeStream(cb: any): Promise<any>;
    unsubscribeStream(): void;
}
