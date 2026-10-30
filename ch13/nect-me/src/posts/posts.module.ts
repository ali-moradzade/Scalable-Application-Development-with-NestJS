import {Module} from '@nestjs/common';
import {PostsService} from './posts.service.js';
import {PostsResolver} from './posts.resolver.js';
import {MongooseModule} from '@nestjs/mongoose';
import {Post, PostSchema} from './schemas/post.schema.js';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Post.name,
                schema: PostSchema,
            }
        ])
    ],
    providers: [PostsResolver, PostsService],
})
export class PostsModule {
}
