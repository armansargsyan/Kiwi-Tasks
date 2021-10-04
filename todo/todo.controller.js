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
exports.TodoController = void 0;
const common_1 = require("@nestjs/common");
const todo_dto_1 = require("./Dto/todo.dto");
const todo_service_1 = require("./todo.service");
const jwt_auth_guard_1 = require("../jwt-auth/jwt-auth.guard");
let TodoController = class TodoController {
    constructor(todoService) {
        this.todoService = todoService;
    }
    async getUserTodos(access_token) {
        return await this.todoService.getUserTodos(access_token);
    }
    async create(todoDto, access_token) {
        return await this.todoService.create(todoDto, access_token);
    }
    async update(todoDto) {
        return await this.todoService.update(todoDto);
    }
    async remove(id) {
        return await this.todoService.delete(+id);
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get(''),
    __param(0, common_1.Headers('Authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "getUserTodos", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('create'),
    __param(0, common_1.Body()),
    __param(1, common_1.Headers('Authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [todo_dto_1.TodoDto, String]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "create", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Put('update'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [todo_dto_1.TodoDto]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "update", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "remove", null);
TodoController = __decorate([
    common_1.Controller('todo'),
    __metadata("design:paramtypes", [todo_service_1.TodoService])
], TodoController);
exports.TodoController = TodoController;
//# sourceMappingURL=todo.controller.js.map