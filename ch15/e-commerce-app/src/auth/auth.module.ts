import {Module} from '@nestjs/common';
import {AuthService} from './auth.service.js';
import {JwtModule} from '@nestjs/jwt';
import {ConfigService} from '@nestjs/config';
import {UsersModule} from '../users/users.module.js';
import { AuthController } from './auth.controller.js';

@Module({
    imports: [
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.getOrThrow('JWT_SECRET'),
                signOptions: {
                    expiresIn: '24h',
                },
                global: true,
            })
        }),
        UsersModule,
    ],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {
}
