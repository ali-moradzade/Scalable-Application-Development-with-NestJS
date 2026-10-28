import {Module} from '@nestjs/common';
import {ProductsService} from './products.service.js';
import {ProductsController} from './products.controller.js';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Product} from './entities/product.entity.js';
import {CommonModule} from '../common/common.module.js';

@Module({
    imports: [
        TypeOrmModule.forFeature([Product]),
        CommonModule,
    ],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule {
}
