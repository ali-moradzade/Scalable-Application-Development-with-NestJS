import {VersionManagementMiddleware} from './version-management.middleware.js';
import {beforeEach} from 'vitest';

describe('VersionManagementMiddleware', () => {
    let middleware: VersionManagementMiddleware;

    beforeEach(() => {
        middleware = new VersionManagementMiddleware();
    });

    it('should prepend /v1 to requests without a version', () => {
        const req: any = {
            url: '/users',
            originalUrl: '/users',
        };
        const res: any = {};
        const next = vi.fn();

        middleware.use(req, res, next);

        expect(req.url).toBe('/v1/users');
        expect(next).toHaveBeenCalled();
    });

    it('should correct invalid version to the latest supported version', () => {
        const req: any = {
            url: '/v3/users',
            originalUrl: '/v3/users',
        };
        const res: any = {};
        const next = vi.fn();

        middleware.use(req, res, next);

        expect(req.url).toBe('/v2/users');
        expect(next).toHaveBeenCalled();
    });
});
