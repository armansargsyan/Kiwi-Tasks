import { Controller, Get } from '@nestjs/common';
import { BinanceService } from './binance.service';

@Controller('binance')
export class BinanceController {
  constructor(private binanceService: BinanceService) {}

  @Get()
  async getUserData() {
    return await this.binanceService.getUserData();
  }

  @Get('assets')
  async getAssetData() {
    return await this.binanceService.getAssetData();
  }
}
