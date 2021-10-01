import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { TodoDto } from './Dto/todo.dto';
import { TodoService } from './todo.service';
import { JwtAuthGuard } from '../jwt-auth/jwt-auth.guard';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  async getUserTodos(
    @Headers('Authorization') access_token: string,
  ): Promise<TodoDto[]> {
    try {
      return await this.todoService.getUserTodos(access_token);
    } catch (error) {
      console.log('Error: ', error.message, 'Code: ', error.status);
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(
    @Body() todoDto: TodoDto,
    @Headers('Authorization') access_token: string,
  ): Promise<TodoDto> {
    try {
      return await this.todoService.create(todoDto, access_token);
    } catch (error) {
      console.log('Error: ', error.message, 'Code: ', error.status);
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async update(@Body() todoDto: TodoDto): Promise<TodoDto> {
    try {
      return await this.todoService.update(todoDto);
    } catch (error) {
      console.log('Error: ', error.message, 'Code: ', error.status);
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<TodoDto> {
    try {
      return await this.todoService.delete(+id);
    } catch (error) {
      console.log('Error: ', error.message, 'Code: ', error.status);
      throw error;
    }
  }
}
