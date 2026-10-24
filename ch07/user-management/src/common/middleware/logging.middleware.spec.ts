import {LoggingMiddleware} from './logging.middleware.js';
import {beforeEach} from 'vitest';

describe('LoggingMiddleware', () => {
    let middleware: LoggingMiddleware;

    beforeEach(() => {
        middleware = new LoggingMiddleware();
    })

    it('should log request details', () => {
        console.log = vi.fn();

        const req: any = {
            method: 'GET',
            originalUrl: '/users',
        }
        const res: any = {}
        const next = vi.fn();

        middleware.use(req, res, next);

        expect(console.log).toHaveBeenCalledWith(
            expect.stringContaining('GET /users')
        );
        expect(next).toHaveBeenCalled();
    })
});
