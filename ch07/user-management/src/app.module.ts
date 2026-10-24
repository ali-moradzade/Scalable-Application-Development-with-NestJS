import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {AppController} from './app.controller.js';
import {AppService} from './app.service.js';
import {UsersModule} from './users/users.module.js';
import {LoggingMiddleware} from './common/middleware/logging.middleware.js';
import {APP_INTERCEPTOR} from '@nestjs/core';
import {ResponseLoggingInterceptor} from './common/interceptors/response-logging.interceptor.js';
import {VersionManagementMiddleware} from './common/middleware/version-management.middleware.js';

@Module({
    imports: [
        UsersModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseLoggingInterceptor,
        }
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(
                LoggingMiddleware,
                VersionManagementMiddleware,
            )
            .forRoutes('*');
    }
}
