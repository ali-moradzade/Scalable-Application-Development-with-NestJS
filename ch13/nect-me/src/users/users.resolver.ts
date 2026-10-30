import {Args, Int, Mutation, Query, Resolver} from '@nestjs/graphql';
import {UsersService} from './users.service.js';
import {User} from './schemas/user.schema.js';
import {CreateUserDto} from './dto/create-user.dto.js';
import {UpdateUserInput} from './dto/update-user.input.js';

@Resolver(() => User)
export class UsersResolver {
    constructor(
        private readonly usersService: UsersService,
    ) {
    }

    @Mutation(() => User)
    createUser(
        @Args('createUserDto') createUserDto: CreateUserDto,
    ) {
        return this.usersService.create(createUserDto);
    }

    @Query(() => [User], {name: 'users'})
    findAll() {
        return this.usersService.findAll();
    }

    @Query(() => User, {name: 'user'})
    findOne(@Args('id', {type: () => Int}) id: number) {
        return this.usersService.findOne(id);
    }

    @Mutation(() => User)
    updateUser(@Args('updateUserDto') updateUserDto: UpdateUserInput) {
        return this.usersService.update(updateUserDto.id, updateUserDto);
    }

    @Mutation(() => User)
    removeUser(@Args('id', {type: () => Int}) id: number) {
        return this.usersService.remove(id);
    }
}
