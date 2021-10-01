import { TodoDto } from './Dto/todo.dto';
import { TodoService } from './todo.service';
export declare class TodoController {
    private readonly todoService;
    constructor(todoService: TodoService);
    getUserTodos(access_token: string): Promise<TodoDto[]>;
    create(todoDto: TodoDto, access_token: string): Promise<TodoDto>;
    update(todoDto: TodoDto): Promise<TodoDto>;
    remove(id: number): Promise<TodoDto>;
}
