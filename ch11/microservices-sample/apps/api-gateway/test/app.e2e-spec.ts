import {afterAll, beforeAll, describe, expect, it, vi,} from 'vitest';
import type {INestApplication, INestMicroservice} from '@nestjs/common';
import {ClientProxy, type MicroserviceOptions, Transport,} from '@nestjs/microservices';
import {Test} from '@nestjs/testing';
import request from 'supertest';

import {OrderModule} from '../../order/src/order.module.js';
import {InventoryModule} from '../../inventory/src/inventory.module.js';
import {OrderStatus} from '../../../libs/shared/src';
import {EVENTS} from '../../../libs/constants/src';

describe('Order and Inventory services integration test', () => {
    let orderApp: INestApplication;
    let inventoryApp: INestMicroservice;

    let orderClient: ClientProxy;

    beforeAll(async () => {
        let inventoryModule = await Test.createTestingModule({
            imports: [InventoryModule],
        }).compile();

        inventoryApp = inventoryModule.createNestMicroservice<MicroserviceOptions>({
            transport: Transport.TCP,
            options: {
                host: '127.0.0.1',
                port: 8002,
            },
        });

        await inventoryApp.listen();

        let orderModule = await Test.createTestingModule({
            imports: [OrderModule],
        }).compile();

        orderApp = orderModule.createNestApplication();

        orderApp.connectMicroservice<MicroserviceOptions>({
            transport: Transport.TCP,
            options: {
                host: '127.0.0.1',
                port: 8001,
            },
        });

        await orderApp.startAllMicroservices();
        await orderApp.init();

        orderClient = orderModule.get<ClientProxy>('INVENTORY_SERVICE');
    });

    afterAll(async () => {
        await Promise.all([
            orderApp?.close(),
            inventoryApp?.close(),
        ]);
    });

    it('should create an order', async () => {
        const response = await request(orderApp.getHttpServer())
            .post('/orders')
            .send({
                product: 'Laptop',
                quantity: 2,
                userId: 'user123',
            })
            .expect(201);

        expect(response.body.status).toEqual(OrderStatus.PENDING);
        expect(response.body).toMatchObject({
            product: 'Laptop',
            quantity: 2,
            userId: 'user123',
        });
    });

    it('should emit ORDER_CREATED when creating an order', async () => {
        const emitSpy = vi.spyOn(orderClient, 'emit');

        const res = await request(orderApp.getHttpServer())
            .post('/orders')
            .send({
                product: 'Laptop',
                quantity: 2,
                userId: 'user123',
            })
            .expect(201);

        const order = res.body;

        expect(emitSpy).toHaveBeenCalledWith(
            EVENTS.ORDER_CREATED,
            expect.objectContaining({
                product: 'Laptop',
                quantity: 2,
                userId: 'user123',
                status: OrderStatus.PENDING,
            }),
        );

        const updatedOrder = await request(orderApp.getHttpServer())
            .get(`/orders/${order.id}`)
            .expect(200);
        expect(updatedOrder.body.status)
            .toBe(OrderStatus.COMPLETED);

        emitSpy.mockRestore();
    });
});
