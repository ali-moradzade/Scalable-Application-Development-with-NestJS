import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class CreateNotificationDto {
    @Field()
    userId: string;

    @Field()
    category: string;

    @Field()
    content: string;
}
