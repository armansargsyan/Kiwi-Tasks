import { NestMiddleware } from '@nestjs/common';
export declare class StaticFilesMiddlewareMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void): void;
}
