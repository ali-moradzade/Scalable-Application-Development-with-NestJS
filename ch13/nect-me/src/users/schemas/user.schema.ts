import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType()
export class UserPreferences {
    @Field()
    darkMode: boolean;

    @Field()
    notifications: boolean;
}

@ObjectType()
@Schema({timestamps: true})
export class User extends Document {
    @Field()
    @Prop({
        required: true,
        unique: true,
    })
    username: string;

    @Field()
    @Prop({
        required: true,
        unique: true,
    })
    email: string;

    @Prop({
        required: true,
    })
    password: string;

    @Field({nullable: true})
    @Prop()
    bio: string;

    @Field(() => UserPreferences)
    preferences: UserPreferences;
}

export const UserSchema = SchemaFactory.createForClass(User);
