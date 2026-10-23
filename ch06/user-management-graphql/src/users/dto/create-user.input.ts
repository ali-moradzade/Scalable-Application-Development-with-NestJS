import {Field, InputType, Int} from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
    @Field(() => String, {
        description: 'the name of a user'
    })
    name: string;

    @Field(() => String, {
        description: 'the email of a user'
    })
    email: string;
}
