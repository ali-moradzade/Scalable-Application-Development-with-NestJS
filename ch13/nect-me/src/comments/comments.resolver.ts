import {Args, Int, Mutation, Query, Resolver} from '@nestjs/graphql';
import {CommentsService} from './comments.service.js';
import {Comment} from './schemas/comment.schema.js';
import {CreateCommentDto} from './dto/create-comment.dto.js';
import {UpdateCommentDto} from './dto/update-comment.dto.js';

@Resolver(() => Comment)
export class CommentsResolver {
    constructor(
        private readonly commentsService: CommentsService,
    ) {
    }

    @Query(() => [Comment], {name: 'comments'})
    findAll() {
        return this.commentsService.findAll();
    }

    @Mutation(() => Comment)
    createComment(@Args('createCommentDto') createCommentDto: CreateCommentDto) {
        return this.commentsService.create(createCommentDto);
    }

    @Query(() => Comment, {name: 'comment'})
    findOne(@Args('id', {type: () => Int}) id: number) {
        return this.commentsService.findOne(id);
    }

    @Mutation(() => Comment)
    updateComment(@Args('updateCommentDto') updateCommentDto: UpdateCommentDto) {
        return this.commentsService.update(updateCommentDto.id, updateCommentDto);
    }

    @Mutation(() => Comment)
    removeComment(@Args('id', {type: () => Int}) id: number) {
        return this.commentsService.remove(id);
    }
}
