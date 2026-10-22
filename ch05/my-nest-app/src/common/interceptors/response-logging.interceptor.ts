import {CallHandler, ExecutionContext, NestInterceptor} from '@nestjs/common';
import {map, Observable} from 'rxjs';

export class ResponseLoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        const start = Date.now();

        return next.handle().pipe(
            map((data) => {
                const executionTime = Date.now() - start;
                console.log(`Request to ${request.url} took ${executionTime}ms`);

                return {
                    success: !(data instanceof Error) && data !== null,
                    data,
                    timestamp: new Date().toISOString(),
                }
            })
        )
    }
}
