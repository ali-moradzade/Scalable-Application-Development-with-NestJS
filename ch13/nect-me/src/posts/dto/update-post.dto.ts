import {CreatePostDto} from './create-post.dto.js';
import {Field, InputType, Int, PartialType} from '@nestjs/graphql';

@InputType()
export class UpdatePostDto extends PartialType(CreatePostDto) {
    @Field(() => Int)
    id: number;
}
