import {Field, ID, ObjectType} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {User} from '../../users/schemas/user.schema.js';

@ObjectType()
@Schema({timestamps: true})
export class Notification extends Document {
    @Field(() => ID)
    id: string;

    @Field()
    @Prop({
        required: true,
    })
    message: string;

    @Field(() => User)
    @Prop({
        type: String,
        ref: 'User',
        required: true,
    })
    recipient: User;

    @Field()
    @Prop({
        type: Boolean,
        default: false,
    })
    read: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);