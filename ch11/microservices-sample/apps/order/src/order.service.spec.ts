import {beforeEach, describe, expect, it, vi} from 'vitest';
import {OrderService} from './order.service';
import {ClientProxy} from '@nestjs/microservices';
import {Test, TestingModule} from '@nestjs/testing';
import {CreateOrderDto} from './dtos/create-order.dto';
import {OrderStatus} from '../../../libs/shared/src';
import {EVENTS} from '../../../libs/constants/src';

describe('OrderService', () => {
    let orderService: OrderService;
    let inventoryClient: ClientProxy;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrderService,
                {
                    provide: 'INVENTORY_SERVICE',
                    useValue: {
                        emit: vi.fn(),
                    }
                }
            ]
        }).compile();

        orderService = module.get<OrderService>(OrderService);
        inventoryClient = module.get<ClientProxy>('INVENTORY_SERVICE');
    });

    it('should create an order and emit an event to the inventory service', () => {
        const createOrderDto: CreateOrderDto = {
            product: 'Laptop',
            quantity: 2,
            name: 'order1',
            price: 500,
        };

        const result = orderService.createOrder(createOrderDto);

        expect(result).toEqual({
            ...createOrderDto,
            id: '1',
            status: OrderStatus.PENDING,
        });
        expect(orderService['orders'].length).toBe(1);
        expect(inventoryClient.emit).toHaveBeenCalledWith(
            EVENTS.ORDER_CREATED,
            {
                ...createOrderDto,
                id: '1',
                status: OrderStatus.PENDING,
            }
        );
    });
});
