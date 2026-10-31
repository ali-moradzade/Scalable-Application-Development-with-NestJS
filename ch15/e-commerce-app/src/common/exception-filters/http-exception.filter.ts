import {ArgumentsHost, Catch, ExceptionFilter, HttpException,} from '@nestjs/common';
import type {Response} from 'express';
import {APIResponse} from '../types/APIResponse.js';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();

        const exceptionResponse = exception.getResponse();

        const errorMessage: string | string[] =
            typeof exceptionResponse === 'object' &&
            exceptionResponse !== null &&
            'message' in exceptionResponse &&
            (typeof exceptionResponse.message === 'string' ||
                (Array.isArray(exceptionResponse.message) &&
                    exceptionResponse.message.every(
                        (item): item is string => typeof item === 'string',
                    )))
                ? exceptionResponse.message
                : exception.message || 'Internal server error';

        const error =
            typeof exceptionResponse === 'object' &&
            exceptionResponse !== null
                ? Object.fromEntries(
                    Object.entries(exceptionResponse).filter(
                        ([key]) => key !== 'message',
                    ),
                )
                : exceptionResponse;

        const body: APIResponse = {
            success: false,
            message: errorMessage,
            data: null,
            error,
        };

        response.status(status).json(body);
    }
}
