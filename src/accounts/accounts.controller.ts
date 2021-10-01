import {
  Headers,
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
  Get, UseGuards,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { UserDto } from './Dto/user.dto';
import { VerificationDto } from './Dto/verification.dto';
import { AccessTokenDto } from './Dto/accessToken.dto';
import {JwtAuthGuard} from "../jwt-auth/jwt-auth.guard";
// import { TokenPipe } from '../token.pipe';

@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly accountService: AccountsService, // private readonly authService: AuthService,
  ) {}

  @Post('login')
  async logIn(@Body() userDto: UserDto): Promise<AccessTokenDto> {
    try {
      return await this.accountService.logIn(userDto);
    } catch (error) {
      console.log('Error: ', error.message, 'Code: ', error.status);
      throw error;
    }
  }

  @Get('validate')
  async validToken(
    @Headers('Authorization') access_token: string,
  ): Promise<boolean> {
    try {
      return await this.accountService.validToken(access_token);
    } catch (error) {
      console.log('Error: ', error.message, 'Code: ', error.status);
      throw error;
    }
  }

  @Post('create')
  async signUp(@Body() userDto: UserDto): Promise<AccessTokenDto> {
    try {
      return await this.accountService.create(userDto);
    } catch (error) {
      console.log('Error: ', error.message, 'Code: ', error.code);
      if (error.errno === 1062) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('verification')
  @UseGuards(JwtAuthGuard)
  async verification(
    @Body() verificationDto: VerificationDto,
    @Headers('Authorization') accessToken,
  ): Promise<AccessTokenDto> {
    try {
      return await this.accountService.verification(
        verificationDto,
        accessToken,
      );
    } catch (error) {
      console.log('Error: ', error.message, 'Code: ', error.status);
      throw error;
    }
  }

  /*@Post('delete')
  async remove(@Body() userDto: UserDto): Promise<UserDto> {
    try {
      return await this.accountService.remove(userDto);
    } catch (error) {
      return error;
    }
  }*/
}
