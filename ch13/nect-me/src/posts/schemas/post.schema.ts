import {Field, ID, ObjectType} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {User} from '../../users/schemas/user.schema.js';

@ObjectType()
@Schema({timestamps: true})
export class Post extends Document {
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
}

export const PostSchema = SchemaFactory.createForClass(Post);