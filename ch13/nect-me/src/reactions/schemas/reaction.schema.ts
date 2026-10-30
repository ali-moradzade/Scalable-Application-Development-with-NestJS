import {Field, ID, ObjectType} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {User} from '../../users/schemas/user.schema.js';
import {Post} from '../../posts/schemas/post.schema.js';
import {Document} from 'mongoose';

@ObjectType()
@Schema({timestamps: true})
export class Reaction extends Document {
    @Field(() => ID)
    id: string;

    @Field()
    @Prop({
        type: String,
        required: true,
        enum: ['LIKE', 'UPVOTE'],
    })
    type: string;

    @Field(() => User)
    @Prop({
        type: String,
        ref: 'User',
        required: true,
    })
    user: User;

    @Field(() => Post)
    @Prop({
        type: String,
        ref: 'Post',
        required: true,
    })
    post: Post;
}

export const ReactionSchema = SchemaFactory.createForClass(Reaction);