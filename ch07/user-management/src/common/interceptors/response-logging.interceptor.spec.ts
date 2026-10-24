import {beforeEach} from 'vitest';
import {Test} from '@nestjs/testing';
import {ResponseLoggingInterceptor} from './response-logging.interceptor.js';
import {createMockExecutionContext} from '../helpers/mock-execution-context.helper.js';
import {CallHandler} from '@nestjs/common';
import {firstValueFrom, of} from 'rxjs';

describe('ResponseLoggingInterceptor', () => {
    let interceptor: ResponseLoggingInterceptor;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [ResponseLoggingInterceptor],
        }).compile();

        interceptor = module.get<ResponseLoggingInterceptor>(ResponseLoggingInterceptor);
    });

    it('should log and format the response', async () => {
        const mockExecutionContext = createMockExecutionContext('mock-token');
        const callHandler: CallHandler = {
            handle: () => of({data: 'test'}),
        };

        const result = await interceptor.intercept(
            mockExecutionContext,
            callHandler,
        );

        await expect(firstValueFrom(result)).resolves.toMatchObject({
            success: true,
            data: {data: 'test'},
            timestamp: expect.any(String),
        });
    });
});
