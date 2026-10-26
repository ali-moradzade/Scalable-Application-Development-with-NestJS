import {Inject, Injectable} from '@nestjs/common';
import {ClientProxy} from '@nestjs/microservices';
import {Order, OrderProcessPayload, OrderStatus} from '@app/shared';
import {CreateOrderDto} from './dtos/create-order.dto.js';
import {EVENTS} from '@app/constants';

@Injectable()
export class OrderService {
    constructor(
        @Inject('INVENTORY_SERVICE') private readonly inventoryClient: ClientProxy,
    ) {
    }

    private orders: Order[] = [];

    createOrder(createOrderDto: CreateOrderDto) {
        const order = {
            ...createOrderDto,
            id: `${this.orders.length + 1}`,
            status: OrderStatus.PENDING,
        };

        this.orders.push(order);
        console.log('Order created: ', order, this.orders);

        this.inventoryClient.emit(EVENTS.ORDER_CREATED, order);

        return order;
    }

    handleOrderProcessed(data: OrderProcessPayload) {
        const order = this.orders.find(o => o.id === data.orderId);
        if (order) {
            order.status = data.success ? OrderStatus.COMPLETED : OrderStatus.CANCELLED;

            console.log('Order status updated:', order, this.orders);
        } else {
            console.log('Order not found');
        }
    }
}
