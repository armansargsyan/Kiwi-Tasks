"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const todo_entity_1 = require("./entitys/todo.entity");
const jwt_auth_service_1 = require("../jwt-auth/jwt-auth.service");
let TodoService = class TodoService {
    constructor(todoRepository, jwtAuthService) {
        this.todoRepository = todoRepository;
        this.jwtAuthService = jwtAuthService;
        this.manager = typeorm_2.getManager();
    }
    async getUserTodos(access_token) {
        try {
            const body = this.jwtAuthService.validate(access_token);
            return await todo_entity_1.ToDo.find({ UserId: body.id });
        }
        catch (e) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Something went wrong',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async create(todoDto, access_token) {
        try {
            const body = this.jwtAuthService.validate(access_token);
            todoDto.UserId = body.id;
            const toDo = this.manager.create(todo_entity_1.ToDo, todoDto);
            await toDo.save();
            return toDo;
        }
        catch (e) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Something went wrong',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async update(todoDto) {
        try {
            await this.manager.update(todo_entity_1.ToDo, todoDto.Id, todoDto);
            return await this.manager.findOne(todo_entity_1.ToDo, todoDto.Id);
        }
        catch (e) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Something went wrong',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async delete(id) {
        try {
            return await this.manager.delete(todo_entity_1.ToDo, id);
        }
        catch (e) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Something went wrong',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
TodoService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(todo_entity_1.ToDo)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_auth_service_1.JwtAuthService])
], TodoService);
exports.TodoService = TodoService;
//# sourceMappingURL=todo.service.js.map