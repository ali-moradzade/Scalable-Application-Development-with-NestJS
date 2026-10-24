import {Injectable, NestMiddleware} from '@nestjs/common';
import {NextFunction, Request, Response} from 'express';

@Injectable()
export class VersionManagementMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const firstPathSegment = req.originalUrl
            .split('/')[1]?.toString()?.toLowerCase();

        if (!firstPathSegment?.startsWith('v')) {
            req.url = '/v1' + req.url;
        } else if (!['v1', 'v2'].includes(firstPathSegment)) {
            req.originalUrl = req.originalUrl.replace(firstPathSegment, 'v2');
        }

        next();
    }
}
