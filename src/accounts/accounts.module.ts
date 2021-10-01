import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entitys/account.entity';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { UnverifiedAccount } from './entitys/unverifiedAccount.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account, UnverifiedAccount]),
    PassportModule,
  ],
  providers: [AccountsService],
  controllers: [AccountsController],
  exports: [AccountsService],
})
export class AccountsModule {}
