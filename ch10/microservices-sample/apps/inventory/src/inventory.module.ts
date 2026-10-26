import {Module} from '@nestjs/common';
import {InventoryController} from './inventory.controller.js';
import {InventoryService} from './inventory.service.js';
import {ClientsModule, Transport} from '@nestjs/microservices';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'ORDER_SERVICE',
                transport: Transport.TCP,
                options: {
                    port: 8001,
                }
            }
        ])
    ],
    controllers: [InventoryController],
    providers: [InventoryService],
})
export class InventoryModule {
}
