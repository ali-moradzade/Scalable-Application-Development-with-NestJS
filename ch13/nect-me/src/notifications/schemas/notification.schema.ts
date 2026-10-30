import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {User} from '../../users/schemas/user.schema.js';

@Schema({timestamps: true})
export class Notification extends Document {
    @Prop({
        required: true,
    })
    message: string;

    @Prop({
        type: String,
        ref: 'User',
        required: true,
    })
    recipient: User;

    @Prop({
        type: Boolean,
        default: false,
    })
    read: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
