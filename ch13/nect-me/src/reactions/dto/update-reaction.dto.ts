import {CreateReactionDto} from './create-reaction.dto.js';
import {Field, InputType, Int, PartialType} from '@nestjs/graphql';

@InputType()
export class UpdateReactionDto extends PartialType(CreateReactionDto) {
    @Field(() => Int)
    id: number;
}
