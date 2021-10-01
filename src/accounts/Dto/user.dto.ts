export class UserDto {
  constructor(
    public id?: number,
    public name?: string,
    public age?: number,
    public email?: string,
    public phoneNumber?: string,
    public password?: string,
    public passwordHash?: string,
    public verificationCode?: string,
  ) {}
}
