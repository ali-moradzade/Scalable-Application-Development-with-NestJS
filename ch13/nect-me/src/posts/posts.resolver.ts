import {Args, Int, Mutation, Query, Resolver} from '@nestjs/graphql';
import {PostsService} from './posts.service.js';
import {Post} from './schemas/post.schema.js';
import {CreatePostDto} from './dto/create-post.dto.js';
import {UpdatePostDto} from './dto/update-post.dto.js';

@Resolver(() => Post)
export class PostsResolver {
    constructor(
        private readonly postsService: PostsService,
    ) {
    }

    @Query(() => [Post], {name: 'posts'})
    findAll() {
        return this.postsService.findAll();
    }

    @Mutation(() => Post)
    createPost(
        @Args('createPostDto') createPostDto: CreatePostDto,
    ) {
        return this.postsService.create(createPostDto);
    }

    @Query(() => Post, {name: 'post'})
    findOne(@Args('id', {type: () => Int}) id: number) {
        return this.postsService.findOne(id);
    }

    @Mutation(() => Post)
    updatePost(@Args('updatePostDto') updatePostDto: UpdatePostDto) {
        return this.postsService.update(updatePostDto.id, updatePostDto);
    }

    @Mutation(() => Post)
    removePost(@Args('id', {type: () => Int}) id: number) {
        return this.postsService.remove(id);
    }
}
