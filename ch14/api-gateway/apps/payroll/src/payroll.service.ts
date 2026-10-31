import {Injectable, OnModuleDestroy, OnModuleInit} from '@nestjs/common';
import {ClientProxy, ClientProxyFactory, Transport} from '@nestjs/microservices';
import {firstValueFrom} from 'rxjs';
import {EventEmitter2} from '@nestjs/event-emitter';

@Injectable()
export class PayrollService implements OnModuleDestroy, OnModuleInit {
    private client: ClientProxy;

    constructor(
        private readonly eventEmitter: EventEmitter2,
    ) {
        this.client = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: '127.0.0.1',
                port: 3001,
            }
        });
    }

    onModuleInit(): any {
        this.eventEmitter.on('employee.created', async (employee) => {
            await this.createEmployeePayroll(employee);
        })
    }

    async createEmployeePayroll(employee: any) {
        return firstValueFrom(
            this.client.send(
                {cmd: 'create_employee'},
                employee,
            ),
        );
    }

    async onModuleDestroy() {
        await this.client.close();
    }
}
