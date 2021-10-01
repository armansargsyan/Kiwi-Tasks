import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TodoDto } from './Dto/todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { ToDo } from './entitys/todo.entity';
import { DecodeAccessTokenDto } from '../accounts/Dto/decodeAccessToken.dto';
import { JwtAuthService } from '../jwt-auth/jwt-auth.service';

@Injectable()
export class TodoService {
  manager;
  constructor(
    @InjectRepository(ToDo)
    private readonly todoRepository: Repository<ToDo>,
    private readonly jwtAuthService: JwtAuthService,
  ) {
    this.manager = getManager();
  }

  async getUserTodos(access_token: string): Promise<any> {
    try {
      const body: DecodeAccessTokenDto =
        this.jwtAuthService.validate(access_token);
      return await ToDo.find({ UserId: body.id });
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Something went wrong',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async create(todoDto: TodoDto, access_token: string): Promise<ToDo> {
    const body: DecodeAccessTokenDto =
      this.jwtAuthService.validate(access_token);
    todoDto.UserId = body.id;
    const toDo = this.manager.create(ToDo, todoDto);
    try {
      await toDo.save();
      return toDo;
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Something went wrong',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async update(todoDto: TodoDto): Promise<TodoDto> {
    try {
      await this.manager.update(ToDo, todoDto.Id, todoDto);
      return await this.manager.findOne(ToDo, todoDto.Id);
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Something went wrong',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async delete(id: number): Promise<any> {
    try {
      return await this.manager.delete(ToDo, id);
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Something went wrong',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
