import {Module} from '@nestjs/common';
import {NotificationsService} from './notifications.service.js';
import {NotificationsResolver} from './notifications.resolver.js';
import {MongooseModule} from '@nestjs/mongoose';
import {NotificationSchema, Notification} from './schemas/notification.schema.js';
import {User, UserSchema} from '../users/schemas/user.schema.js';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Notification.name,
                schema: NotificationSchema,
            },
            {
                name: User.name,
                schema: UserSchema,
            }
        ])
    ],
    providers: [NotificationsResolver, NotificationsService],
})
export class NotificationsModule {
}
