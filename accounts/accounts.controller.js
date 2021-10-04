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
exports.AccountsController = void 0;
const common_1 = require("@nestjs/common");
const accounts_service_1 = require("./accounts.service");
const user_dto_1 = require("./Dto/user.dto");
const verification_dto_1 = require("./Dto/verification.dto");
const jwt_auth_guard_1 = require("../jwt-auth/jwt-auth.guard");
let AccountsController = class AccountsController {
    constructor(accountService) {
        this.accountService = accountService;
    }
    async logIn(userDto) {
        return await this.accountService.logIn(userDto);
    }
    async validToken(access_token) {
        return await this.accountService.validToken(access_token);
    }
    async signUp(userDto) {
        return await this.accountService.create(userDto);
    }
    async verification(verificationDto, accessToken) {
        return await this.accountService.verification(verificationDto, accessToken);
    }
};
__decorate([
    common_1.Post('login'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], AccountsController.prototype, "logIn", null);
__decorate([
    common_1.Get('validate'),
    __param(0, common_1.Headers('Authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccountsController.prototype, "validToken", null);
__decorate([
    common_1.Post('create'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], AccountsController.prototype, "signUp", null);
__decorate([
    common_1.Post('verification'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Body()),
    __param(1, common_1.Headers('Authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verification_dto_1.VerificationDto, Object]),
    __metadata("design:returntype", Promise)
], AccountsController.prototype, "verification", null);
AccountsController = __decorate([
    common_1.Controller('accounts'),
    __metadata("design:paramtypes", [accounts_service_1.AccountsService])
], AccountsController);
exports.AccountsController = AccountsController;
//# sourceMappingURL=accounts.controller.js.map