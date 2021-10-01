import { Module } from '@nestjs/common';
import { BinanceService } from './binance.service';
import { BinanceProvider } from './binance.provider';
import { BinanceController } from './binance.controller';

@Module({
  imports: [],
  providers: [BinanceService, BinanceProvider],
  exports: [BinanceService],
  controllers: [BinanceController],
})
export class BinanceModule {}
