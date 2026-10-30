import {Module} from '@nestjs/common';
import {CommentsService} from './comments.service.js';
import {CommentsResolver} from './comments.resolver.js';
import {MongooseModule} from '@nestjs/mongoose';
import {CommentSchema, Comment} from './schemas/comment.schema.js';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Comment.name,
                schema: CommentSchema,
            }
        ])
    ],
    providers: [CommentsResolver, CommentsService],
})
export class CommentsModule {
}
