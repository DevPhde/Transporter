import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JsonWebTokenProvider } from 'src/Providers/Jwt/JwtProvider';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
    constructor(private jwtProvider: JsonWebTokenProvider) {}
    use(req: Request, res: Response, next: NextFunction) {
        try {
            this.jwtProvider.jwtVerifyAndDecode(req.headers.authorization)
            next();
        } catch(e) {
            res.status(401).json(e.message)
        }
    }
}
