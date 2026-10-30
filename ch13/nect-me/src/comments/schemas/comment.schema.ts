import {Field, ID, ObjectType} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {User} from '../../users/schemas/user.schema.js';
import {Post} from '../../posts/schemas/post.schema.js';

@ObjectType()
@Schema({timestamps: true})
export class Comment {
    @Field(() => ID)
    id: string;

    @Field()
    @Prop({
        type: String,
        required: true,
    })
    content: string;

    @Field()
    @Prop({
        type: Boolean,
        default: false,
    })
    isDeleted: boolean;

    @Field(() => User)
    @Prop({
        type: String,
        ref: 'User',
        required: true,
    })
    author: User;

    @Field(() => Post)
    @Prop({
        type: String,
        ref: 'Post',
        required: true,
    })
    post: Post;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);