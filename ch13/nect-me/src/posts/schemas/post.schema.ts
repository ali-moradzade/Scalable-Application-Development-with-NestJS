import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {User} from '../../users/schemas/user.schema.js';

@Schema({timestamps: true})
export class Post extends Document {
    @Prop({
        type: String,
        required: true,
    })
    content: string;

    @Prop({
        type: Boolean,
        default: false,
    })
    isDeleted: boolean;

    @Prop({
        type: String,
        ref: 'User',
        required: true,
    })
    author: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);
