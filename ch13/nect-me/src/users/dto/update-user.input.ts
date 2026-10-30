import {CreateUserDto} from './create-user.dto.js';
import {Field, InputType, Int, PartialType} from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserDto) {
    @Field(() => Int)
    id: number;
}
