import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class UpdatePreferencesInput {
    @Field()
    darkMode: boolean;

    @Field()
    notifications: boolean;
}