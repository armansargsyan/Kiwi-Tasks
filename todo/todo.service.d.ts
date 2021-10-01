import { TodoDto } from './Dto/todo.dto';
import { Repository } from 'typeorm';
import { ToDo } from './entitys/todo.entity';
import { JwtAuthService } from '../jwt-auth/jwt-auth.service';
export declare class TodoService {
    private readonly todoRepository;
    private readonly jwtAuthService;
    manager: any;
    constructor(todoRepository: Repository<ToDo>, jwtAuthService: JwtAuthService);
    getUserTodos(access_token: string): Promise<any>;
    create(todoDto: TodoDto, access_token: string): Promise<ToDo>;
    update(todoDto: TodoDto): Promise<TodoDto>;
    delete(id: number): Promise<any>;
}
