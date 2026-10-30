import {CreateCommentDto} from './create-comment.dto.js';
import {Field, InputType, Int, PartialType} from '@nestjs/graphql';

@InputType()
export class UpdateCommentDto extends PartialType(CreateCommentDto) {
    @Field(() => Int)
    id: number;
}
