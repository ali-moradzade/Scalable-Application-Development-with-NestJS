import {Module} from '@nestjs/common';
import {OrdersService} from './orders.service.js';
import {OrdersController} from './orders.controller.js';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Order} from './entities/order.entity.js';
import {Product} from '../products/entities/product.entity.js';
import {CommonModule} from '../common/common.module.js';
import {User} from '../users/entities/user.entity.js';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Order,
            Product,
            User,
        ]),
        CommonModule,
    ],
    controllers: [OrdersController],
    providers: [OrdersService],
})
export class OrdersModule {
}
