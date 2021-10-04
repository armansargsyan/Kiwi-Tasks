import { AppService } from './app.service';
import { Response, NextFunction, Request } from 'express';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    get(res: Response, next: NextFunction, req: Request): void;
}
