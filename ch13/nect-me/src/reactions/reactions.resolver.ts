import {Args, Int, Mutation, Query, Resolver} from '@nestjs/graphql';
import {ReactionsService} from './reactions.service.js';
import {Reaction} from './schemas/reaction.schema.js';
import {CreateReactionDto} from './dto/create-reaction.dto.js';
import {UpdateReactionDto} from './dto/update-reaction.dto.js';

@Resolver(() => Reaction)
export class ReactionsResolver {
    constructor(
        private readonly reactionsService: ReactionsService,
    ) {
    }

    @Mutation(() => Reaction)
    createReaction(@Args('createReactionDto') createReactionDto: CreateReactionDto) {
        return this.reactionsService.create(createReactionDto);
    }

    @Query(() => [Reaction], {name: 'reactions'})
    findAll() {
        return this.reactionsService.findAll();
    }

    @Query(() => Reaction, {name: 'reaction'})
    findOne(@Args('id', {type: () => Int}) id: number) {
        return this.reactionsService.findOne(id);
    }

    @Mutation(() => Reaction)
    updateReaction(@Args('updateReactionDto') updateReactionDto: UpdateReactionDto) {
        return this.reactionsService.update(updateReactionDto.id, updateReactionDto);
    }

    @Mutation(() => Reaction)
    removeReaction(@Args('id', {type: () => Int}) id: number) {
        return this.reactionsService.remove(id);
    }
}
