import {Controller} from '@nestjs/common';
import {InventoryService} from './inventory.service.js';
import {EventPattern} from '@nestjs/microservices';
import {EVENTS} from '@app/constants';
import type {Order} from '@app/shared';

@Controller()
export class InventoryController {
    constructor(
        private readonly inventoryService: InventoryService,
    ) {
    }

    @EventPattern(EVENTS.ORDER_CREATED)
    async handleOrderCreated(data: any) {
        this.inventoryService.handleOrderCreated(data as Order);
    }
}
