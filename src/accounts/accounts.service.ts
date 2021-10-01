import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from 'src/accounts/Dto/user.dto';
import * as bcrypt from 'bcrypt';
import { Account } from './entitys/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { VerificationDto } from './Dto/verification.dto';
import { UnverifiedAccount } from './entitys/unverifiedAccount.entity';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';
import { AccessTokenDto } from './Dto/accessToken.dto';
import { DecodeAccessTokenDto } from './Dto/decodeAccessToken.dto';
import { JwtAuthService } from '../jwt-auth/jwt-auth.service';

@Injectable()
export class AccountsService {
  manager;
  constructor(
    @InjectRepository(UnverifiedAccount)
    private accountRepository: Repository<Account>,
    @InjectRepository(UnverifiedAccount)
    private unverifiedAccountRepository: Repository<UnverifiedAccount>,
    @InjectTwilio() private readonly client: TwilioClient,
    private jwtAuthService: JwtAuthService,
  ) {
    this.manager = getManager();
  }

  verificationCodeGenerator(): number {
    return Math.floor(Math.random() * 900000 + 100000);
  }

  async create(userDto: UserDto): Promise<AccessTokenDto> {
    const salt = await bcrypt.genSalt();
    const code = this.verificationCodeGenerator();
    userDto.passwordHash = await bcrypt.hash(userDto.password, salt);
    userDto.verificationCode = `${code}`;
    delete userDto.password;
    const account = this.manager.create(UnverifiedAccount, userDto);
    try {
      await account.save();
      await this.sendSMS(userDto.phoneNumber, code);
      return this.jwtAuthService.sign({
        email: account.email,
        id: account.id,
      });
    } catch (e) {
      console.log('error', e);
    }
  }

  async logIn(userDto: UserDto): Promise<AccessTokenDto> {
    const foundUser = await Account.findOne({ email: userDto.email });

    if (!foundUser) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Wrong email or password',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const isMatch = await bcrypt.compare(
      userDto.password,
      foundUser.passwordHash,
    );

    if (!isMatch) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Wrong email or password',
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return this.jwtAuthService.sign({
        email: foundUser.email,
        id: foundUser.id,
      });
    }
  }

  async validToken(access_token: string) {
    const body: DecodeAccessTokenDto =
      this.jwtAuthService.validate(access_token);

    const foundUser = await Account.findOne(body.id);

    if (!foundUser || !body) {
      return false;
    }
    return true;
  }
  // async remove(userDto: UserDto): Promise<UserDto> {
  //   const foundUser = await Account.findOne({ email: userDto.email });
  //
  //   const isMatch = await bcrypt.compare(
  //     userDto.password,
  //     foundUser.passwordHash,
  //   );
  //
  //   if (!isMatch) {
  //     throw new Error('Wrong email or password');
  //   } else {
  //     await foundUser.remove();
  //     return foundUser;
  //   }
  // }

  async verification(
    verificationDto: VerificationDto,
    access_token: string,
  ): Promise<AccessTokenDto> {
    const body: DecodeAccessTokenDto =
      this.jwtAuthService.validate(access_token);
    const foundUser = await UnverifiedAccount.findOne({
      email: body.email,
      verificationCode: verificationDto.code,
    });
    if (!foundUser) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Verification failed',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const account = this.manager.create(Account, foundUser);
    await account.save();
    await this.manager.delete(UnverifiedAccount, foundUser.id);
    return this.jwtAuthService.sign({ email: account.email, id: account.id });
  }

  async sendSMS(phoneNumber, code) {
    try {
      return await this.client.messages.create({
        body: `Your code is ${code}`,
        from: '+17865902248',
        to: phoneNumber,
      });
    } catch (e) {
      return e;
    }
  }
}
