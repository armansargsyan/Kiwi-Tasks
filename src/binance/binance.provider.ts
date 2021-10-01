import { Injectable } from '@nestjs/common';
const Binance = require('node-binance-api');

@Injectable()
export class BinanceProvider {
  // constructor() {}

  getClient(apiKey: string, apiSecret: string) {
    const binance = new Binance();
    return binance.options({
      APIKEY: apiKey,
      APISECRET: apiSecret,
    });
  }
}
