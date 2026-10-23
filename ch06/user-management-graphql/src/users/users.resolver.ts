import {Args, Int, Mutation, Query, Resolver, Subscription} from '@nestjs/graphql';
import {UsersService} from './users.service.js';
import {User} from './entities/user.entity.js';
import {CreateUserInput} from './dto/create-user.input.js';
import {UpdateUserInput} from './dto/update-user.input.js';
import {PubSub} from 'graphql-subscriptions'

const pubSub = new PubSub()

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {
    }

    @Mutation(() => User)
    createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
        const newUser = this.usersService.create(createUserInput);

        pubSub.publish('userCreated', {userCreated: newUser}).then();

        return newUser;
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
    updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
        const updatedUser = this.usersService.update(updateUserInput.id, updateUserInput);

        pubSub.publish('userUpdated', {userUpdated: updatedUser}).then()

        return updatedUser;
    }

    @Mutation(() => User)
    removeUser(@Args('id', {type: () => Int}) id: number) {
        return this.usersService.remove(id);
    }

    @Subscription(() => User, {
        name: 'userCreated',
        resolve: (payload) => payload.userCreated,
    })
    userCreated() {
        return pubSub.asyncIterableIterator('userCreated');
    }

    @Subscription(() => User, {
        name: 'userUpdated',
        resolve: (payload) => payload.userUpdated,
    })
    userUpdated() {
        return pubSub.asyncIterableIterator('userUpdated');
    }
}
