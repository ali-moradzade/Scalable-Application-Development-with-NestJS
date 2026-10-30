import {Injectable} from '@nestjs/common';
import {CreateNotificationDto} from './dto/create-notification.dto.js';
import {UpdateNotificationDto} from './dto/update-notification.dto.js';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User} from '../users/schemas/user.schema.js';
import {Notification} from './schemas/notification.schema.js';

@Injectable()
export class NotificationsService {
    constructor(
        @InjectModel(Notification.name) private readonly notificationModel: Model<Notification>,
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) {
    }

    async create({userId, content, category}: CreateNotificationDto) {
        const user = await this.userModel.findById(userId).exec();

        if (user?.preferences.notifications) {
            const notification = new this.notificationModel({userId, category, content});

            return notification.save();
        }

        return null;
    }

    findAll() {
        return `This action returns all notifications`;
    }

    findOne(id: number) {
        return `This action returns a #${id} notification`;
    }

    update(id: number, updateNotificationInput: UpdateNotificationDto) {
        return `This action updates a #${id} notification`;
    }

    remove(id: number) {
        return `This action removes a #${id} notification`;
    }
}
