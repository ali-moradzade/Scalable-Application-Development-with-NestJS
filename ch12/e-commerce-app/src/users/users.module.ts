import {Module} from '@nestjs/common';
import {UsersService} from './users.service.js';
import {UsersController} from './users.controller.js';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Order} from '../orders/entities/order.entity.js';
import {User} from './entities/user.entity.js';
import {CommonModule} from '../common/common.module.js';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Order,
            User,
        ]),
        CommonModule,
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [
        UsersService,
    ],
})
export class UsersModule {
}
