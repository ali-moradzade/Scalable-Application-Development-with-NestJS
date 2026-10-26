import {Module} from '@nestjs/common';
import {ProxyController} from './proxy.controller.js';
import {ApiGatewayService} from './api-gateway.service.js';
import {TerminusModule} from '@nestjs/terminus';
import {HttpModule} from '@nestjs/axios'

@Module({
    imports: [
        TerminusModule,
        HttpModule,
    ],
    controllers: [ProxyController],
    providers: [ApiGatewayService],
})
export class ApiGatewayModule {
}
