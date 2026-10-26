import {Test, TestingModule} from '@nestjs/testing';
import {ProxyController} from './proxy.controller.js';
import {ApiGatewayService} from './api-gateway.service.js';

describe('ApiGatewayController', () => {
    let apiGatewayController: ProxyController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [ProxyController],
            providers: [ApiGatewayService],
        }).compile();

        apiGatewayController = app.get<ProxyController>(ProxyController);
    });

    describe('root', () => {
        it('should return "Hello World!"', () => {
            expect(apiGatewayController.getHello()).toBe('Hello World!');
        });
    });
});
