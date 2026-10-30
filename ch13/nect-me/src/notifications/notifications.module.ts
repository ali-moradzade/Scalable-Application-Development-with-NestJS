import {Module} from '@nestjs/common';
import {NotificationsService} from './notifications.service.js';
import {NotificationsResolver} from './notifications.resolver.js';
import {MongooseModule} from '@nestjs/mongoose';
import {NotificationSchema} from './schemas/notification.schema.js';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Notification.name,
                schema: NotificationSchema,
            },
        ])
    ],
    providers: [NotificationsResolver, NotificationsService],
})
export class NotificationsModule {
}
