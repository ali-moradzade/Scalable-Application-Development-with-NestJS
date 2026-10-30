import {CreateUserDto} from './create-user.dto.js';
import {Field, ID, InputType, Int, PartialType} from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserDto) {
    @Field(() => ID)
    id: string;
}
