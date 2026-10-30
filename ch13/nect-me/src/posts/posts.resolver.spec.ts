import {Test, TestingModule} from '@nestjs/testing';
import {PostsResolver} from './posts.resolver.js';
import {PostsService} from './posts.service.js';

describe('PostsResolver', () => {
    let resolver: PostsResolver;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PostsResolver, PostsService],
        }).compile();

        resolver = module.get<PostsResolver>(PostsResolver);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });
});
