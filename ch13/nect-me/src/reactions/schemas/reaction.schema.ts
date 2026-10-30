import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {User} from '../../users/schemas/user.schema.js';
import {Post} from '../../posts/schemas/post.schema.js';

@Schema({timestamps: true})
export class Reaction extends Document {
    @Prop({
        type: String,
        required: true,
        enum: ['LIKE', 'UPVOTE'],
    })
    type: string;

    @Prop({
        type: String,
        ref: 'User',
        required: true,
    })
    user: User;

    @Prop({
        type: String,
        ref: 'Post',
        required: true,
    })
    post: Post;
}

export const ReactionSchema = SchemaFactory.createForClass(Reaction);
