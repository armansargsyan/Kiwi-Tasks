import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from './accounts/accounts.module';
import { TwilioModule } from 'nestjs-twilio';
import { TodoModule } from './todo/todo.module';
import { JwtAuthService } from './jwt-auth/jwt-auth.service';
import { JwtModule } from '@nestjs/jwt';
import { BinanceModule } from './binance/binance.module';
import { WsGateway } from './ws.gateway';
import { ServeStaticModule } from '@nestjs/serve-static';
import { WsAssetsGateway } from './ws-assets.gateway';
import { WsRoomsGateway } from './ws-rooms.gateway';

@Global()
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: '../public',
      // rootPath: '/home/pc/Desktop/Arman Sargsyan/NestJs/first-porject/client',
    }),
    TypeOrmModule.forRoot(),
    AccountsModule,
    JwtModule.register({
      secret: 'jwtConstants.secret',
    }),
    TwilioModule.forRoot({
      accountSid: 'ACe0f0688c733e77fca00c6afb99ac724e',
      authToken: '110bc3868bd44f6148367cb41460c456',
    }),
    TodoModule,
    BinanceModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtAuthService,
    WsGateway,
    WsAssetsGateway,
    WsRoomsGateway,
  ],
  exports: [TypeOrmModule, JwtAuthService],
})
export class AppModule {}
