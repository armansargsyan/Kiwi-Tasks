import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenDto } from '../accounts/Dto/accessToken.dto';
import { DecodeAccessTokenDto } from '../accounts/Dto/decodeAccessToken.dto';

@Injectable()
export class JwtAuthService {
  constructor(private jwtService: JwtService) {}

  public sign(payload): AccessTokenDto {
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public validate(token: string): DecodeAccessTokenDto {
    return <DecodeAccessTokenDto>this.jwtService.decode(token);
  }
}
