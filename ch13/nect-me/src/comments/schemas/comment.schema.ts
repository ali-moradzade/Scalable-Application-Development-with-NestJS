import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {User} from '../../users/schemas/user.schema.js';
import {Post} from '../../posts/schemas/post.schema.js';

@Schema({timestamps: true})
export class Comment {
    @Prop({
        type: String,
        required: true,
    })
    content: string;

    @Prop({
        type: Boolean,
        default: false
    })
    isDeleted: boolean;

    @Prop({
        type: String,
        ref: 'User',
        required: true,
    })
    author: User;

    @Prop({
        type: String,
        ref: 'Post',
        required: true,
    })
    post: Post;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
