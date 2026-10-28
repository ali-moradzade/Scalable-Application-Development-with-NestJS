import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common';
import {map, Observable} from 'rxjs';
import {APIResponse} from '../types/APIResponse.js';

@Injectable()
export class ApiResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((data: APIResponse) => {
                const message = data?.message ?? 'Request successful';
                const {message: _message, ...rest} = data ?? {};

                const data_ = data instanceof Error
                    ? null
                    : rest.data ?? data;

                const success = !(data instanceof Error) && data_ !== null;

                return {
                    success,
                    data: data_,
                    error: data instanceof Error ? data : null,
                    message,
                };
            })
        );
    }
}
