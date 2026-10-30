import {Args, Int, Mutation, Query, Resolver, Subscription} from '@nestjs/graphql';
import {NotificationsService} from './notifications.service.js';
import {Notification} from './schemas/notification.schema.js';
import {CreateNotificationDto} from './dto/create-notification.dto.js';
import {UpdateNotificationDto} from './dto/update-notification.dto.js';
import {PubSub} from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver(() => Notification)
export class NotificationsResolver {
    constructor(
        private readonly notificationsService: NotificationsService,
    ) {
    }

    @Mutation(() => Notification)
    async createNotification(@Args('createNotificationDto') createNotificationDto: CreateNotificationDto) {
        const newNotification = await this.notificationsService.create(createNotificationDto);

        await pubSub.publish('notificationAdded', {
            notificationAdded: newNotification,
        });

        return newNotification;
    }

    @Subscription(returns => Notification, {
        filter: (payload, variables, context) => {
            const userPreferences = context.user.preferences;
            return userPreferences.get(payload.notification.category) === true;
        }
    })
    notificationAdded(
        @Args('recipientId') recipientId: string,
    ) {
        return pubSub.asyncIterableIterator('notificationAdded');
    }

    @Query(() => [Notification], {name: 'notifications'})
    findAll() {
        return this.notificationsService.findAll();
    }

    @Query(() => Notification, {name: 'notification'})
    findOne(@Args('id', {type: () => Int}) id: number) {
        return this.notificationsService.findOne(id);
    }

    @Mutation(() => Notification)
    updateNotification(@Args('updateNotificationDto') updateNotificationDto: UpdateNotificationDto) {
        return this.notificationsService.update(updateNotificationDto.id, updateNotificationDto);
    }

    @Mutation(() => Notification)
    removeNotification(@Args('id', {type: () => Int}) id: number) {
        return this.notificationsService.remove(id);
    }
}
