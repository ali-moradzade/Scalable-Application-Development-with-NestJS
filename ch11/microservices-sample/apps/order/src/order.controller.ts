import {Body, Controller, Post} from '@nestjs/common';
import {OrderService} from './order.service.js';
import {CreateOrderDto} from './dtos/create-order.dto.js';
import {EventPattern} from '@nestjs/microservices';
import {EVENTS} from '@app/constants';
import {OrderProcessPayload} from '@app/shared';

@Controller()
export class OrderController {
    constructor(private readonly orderService: OrderService) {
    }

    @Post('create-order')
    createOrder(
        @Body() createOrderDto: CreateOrderDto,
    ) {
        return this.orderService.createOrder(createOrderDto);
    }

    @EventPattern(EVENTS.ORDER_PROCESSED)
    async handleOrderProcessed(
        data: any,
    ) {
        this.orderService.handleOrderProcessed(data as OrderProcessPayload);
    }
}
