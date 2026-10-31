import {Module} from '@nestjs/common';
import {AppController} from './app.controller.js';
import {AppService} from './app.service.js';
import {HttpModule} from '@nestjs/axios';

@Module({
    imports: [
        HttpModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
