"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = void 0;
class UserDto {
    constructor(id, name, age, email, phoneNumber, password, passwordHash, verificationCode) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.passwordHash = passwordHash;
        this.verificationCode = verificationCode;
    }
}
exports.UserDto = UserDto;
//# sourceMappingURL=user.dto.js.map