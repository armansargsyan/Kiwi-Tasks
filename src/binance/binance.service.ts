import { Injectable } from '@nestjs/common';
import { BinanceProvider } from './binance.provider';

@Injectable()
export class BinanceService {
  client;
  subscribe;

  constructor(private binanceProvider: BinanceProvider) {
    this.getClient().then();
  }

  async getClient(): Promise<any> {
    this.client = await this.binanceProvider.getClient(
      'muLSdXnYSGnIA4Ghk7mrFBc4ZNvKwPCJ2SwL9eQAtBEhtDHR8acbj9tDvynmNrAM',
      'QHUn7ItVOGM8Z8cNixDtdW4m1YaMoAtvFqMtHXBjGt0kpGjXrYN5zf05KlEvj6cs',
    );
    return this.client;
  }

  async getUserData(): Promise<any> {
    let data;
    await this.client.accountSnapshot('SPOT').then((res) => {
      data = res.data;
    });
    return data;
  }

  async getAssetData(): Promise<any> {
    let data;
    await this.client.prevDay().then((res) => {
      data = res;
    });
    return data;
  }

  async subscribeStream(cb) {
    this.subscribe = await this.client.futuresTickerStream(cb);
    return this.subscribe;
  }

  unsubscribeStream() {
    console.log('is not working');
  }
}
