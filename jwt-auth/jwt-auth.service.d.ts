import { JwtService } from '@nestjs/jwt';
import { AccessTokenDto } from '../accounts/Dto/accessToken.dto';
import { DecodeAccessTokenDto } from '../accounts/Dto/decodeAccessToken.dto';
export declare class JwtAuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    sign(payload: any): AccessTokenDto;
    validate(token: string): DecodeAccessTokenDto;
}
