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
exports.AccountsService = void 0;
const common_1 = require("@nestjs/common");
const user_dto_1 = require("./Dto/user.dto");
const bcrypt = require("bcrypt");
const account_entity_1 = require("./entitys/account.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const unverifiedAccount_entity_1 = require("./entitys/unverifiedAccount.entity");
const nestjs_twilio_1 = require("nestjs-twilio");
const jwt_auth_service_1 = require("../jwt-auth/jwt-auth.service");
let AccountsService = class AccountsService {
    constructor(accountRepository, unverifiedAccountRepository, client, jwtAuthService) {
        this.accountRepository = accountRepository;
        this.unverifiedAccountRepository = unverifiedAccountRepository;
        this.client = client;
        this.jwtAuthService = jwtAuthService;
        this.manager = typeorm_2.getManager();
    }
    verificationCodeGenerator() {
        return Math.floor(Math.random() * 900000 + 100000);
    }
    async create(userDto) {
        const salt = await bcrypt.genSalt();
        const code = this.verificationCodeGenerator();
        userDto.passwordHash = await bcrypt.hash(userDto.password, salt);
        userDto.verificationCode = `${code}`;
        delete userDto.password;
        const account = this.manager.create(unverifiedAccount_entity_1.UnverifiedAccount, userDto);
        try {
            await account.save();
            await this.sendSMS(userDto.phoneNumber, code);
            return this.jwtAuthService.sign({
                email: account.email,
                id: account.id,
            });
        }
        catch (e) {
            if (e.code === 'ER_DUP_ENTRY') {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.CONFLICT,
                    message: e.message,
                }, common_1.HttpStatus.CONFLICT);
            }
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: e.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async logIn(userDto) {
        try {
            const foundUser = await account_entity_1.Account.findOne({ email: userDto.email });
            if (!foundUser) {
                throw common_1.HttpStatus.BAD_REQUEST;
            }
            const isMatch = await bcrypt.compare(userDto.password, foundUser.passwordHash);
            if (!isMatch) {
                throw common_1.HttpStatus.BAD_REQUEST;
            }
            else {
                return this.jwtAuthService.sign({
                    email: foundUser.email,
                    id: foundUser.id,
                });
            }
        }
        catch (e) {
            if (e === common_1.HttpStatus.BAD_REQUEST) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: 'Wrong email or password',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Server Error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async validToken(access_token) {
        try {
            const body = this.jwtAuthService.validate(access_token);
            const foundUser = await account_entity_1.Account.findOne(body.id);
            return !(!foundUser || !body);
        }
        catch (e) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Server Error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async verification(verificationDto, access_token) {
        try {
            const body = this.jwtAuthService.validate(access_token);
            const foundUser = await unverifiedAccount_entity_1.UnverifiedAccount.findOne({
                email: body.email,
                verificationCode: verificationDto.code,
            });
            if (!foundUser) {
                throw common_1.HttpStatus.BAD_REQUEST;
            }
            const account = this.manager.create(account_entity_1.Account, foundUser);
            await account.save();
            await this.manager.delete(unverifiedAccount_entity_1.UnverifiedAccount, foundUser.id);
            return this.jwtAuthService.sign({ email: account.email, id: account.id });
        }
        catch (e) {
            if (e === common_1.HttpStatus.BAD_REQUEST) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: 'Verification failed',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Server Error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async sendSMS(phoneNumber, code) {
        try {
            return await this.client.messages.create({
                body: `Your code is ${code}`,
                from: '+17865902248',
                to: phoneNumber,
            });
        }
        catch (e) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Server Error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
AccountsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(unverifiedAccount_entity_1.UnverifiedAccount)),
    __param(1, typeorm_1.InjectRepository(unverifiedAccount_entity_1.UnverifiedAccount)),
    __param(2, nestjs_twilio_1.InjectTwilio()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository, Object, jwt_auth_service_1.JwtAuthService])
], AccountsService);
exports.AccountsService = AccountsService;
//# sourceMappingURL=accounts.service.js.map