import {Module} from '@nestjs/common';
import {UsersController} from './users.controller.js';
import {UsersService} from './users.service.js';
import {ExternalUserDataService} from '../external-services/external-user-data.service.js';

@Module({
    controllers: [
        UsersController,
    ],
    providers: [
        UsersService,
        {
            provide: 'EXTERNAL_USER_DATA_SERVICE',
            useClass: ExternalUserDataService,
        }
    ],
})
export class UsersModule {

}
