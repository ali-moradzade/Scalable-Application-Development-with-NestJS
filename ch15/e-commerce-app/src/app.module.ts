import {Module} from '@nestjs/common';
import {AppController} from './app.controller.js';
import {AppService} from './app.service.js';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {ProductsModule} from './products/products.module.js';
import Joi from 'joi';
import {Product} from './products/entities/product.entity.js';
import {OrdersModule} from './orders/orders.module.js';
import {Order} from './orders/entities/order.entity.js';
import {CommonModule} from './common/common.module.js';
import {UsersModule} from './users/users.module.js';
import {User} from './users/entities/user.entity.js';
import {AuthModule} from './auth/auth.module.js';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                DB_HOST: Joi.string().hostname().required(),
                DB_PORT: Joi.number().port().default(5432),
                DB_USERNAME: Joi.string().required(),
                DB_PASSWORD: Joi.string().required(),
                DB_DATABASE: Joi.string().required(),
                JWT_SECRET: Joi.string().required(),
            })
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres' as const,
                host: configService.getOrThrow<string>('DB_HOST'),
                port: configService.getOrThrow<number>('DB_PORT'),
                username: configService.getOrThrow<string>('DB_USERNAME'),
                password: configService.getOrThrow<string>('DB_PASSWORD'),
                database: configService.getOrThrow<string>('DB_DATABASE'),
                autoLoadEntities: true,
                synchronize: true,
                entities: [
                    Product,
                    Order,
                    User,
                ]
            }),
        }),
        ProductsModule,
        OrdersModule,
        CommonModule,
        UsersModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
