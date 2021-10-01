import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtAuthService } from './jwt-auth.service';
export declare class JwtAuthGuard implements CanActivate {
    private readonly jwtAuthService;
    constructor(jwtAuthService: JwtAuthService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
