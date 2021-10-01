import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDo } from './entitys/todo.entity';
import { UnverifiedAccount } from '../accounts/entitys/unverifiedAccount.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ToDo, UnverifiedAccount])],
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {}
