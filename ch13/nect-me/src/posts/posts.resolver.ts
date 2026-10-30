import {Args, Int, Mutation, Query, Resolver, Subscription} from '@nestjs/graphql';
import {PostsService} from './posts.service.js';
import {Post} from './schemas/post.schema.js';
import {CreatePostDto} from './dto/create-post.dto.js';
import {UpdatePostDto} from './dto/update-post.dto.js';
import {PubSub} from 'graphql-subscriptions';

const pubSub = new PubSub();

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
    async createPost(
        @Args('createPostDto') createPostDto: CreatePostDto,
    ) {
        const newPost = await this.postsService.create(createPostDto);

        await pubSub.publish('postAdded', {
            postAdded: newPost,
        });

        return newPost;
    }

    @Subscription(returns => Post)
    postAdded() {
        return pubSub.asyncIterableIterator('postAdded');
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
