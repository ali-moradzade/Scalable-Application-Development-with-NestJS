import {CreateNotificationDto} from './create-notification.dto.js';
import {Field, InputType, Int, PartialType} from '@nestjs/graphql';

@InputType()
export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {
    @Field(() => Int)
    id: number;
}
