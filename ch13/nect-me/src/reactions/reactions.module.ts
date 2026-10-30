import {Module} from '@nestjs/common';
import {ReactionsService} from './reactions.service.js';
import {ReactionsResolver} from './reactions.resolver.js';
import {MongooseModule} from '@nestjs/mongoose';
import {Reaction, ReactionSchema} from './schemas/reaction.schema.js';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Reaction.name,
                schema: ReactionSchema,
            }
        ])
    ],
    providers: [ReactionsResolver, ReactionsService],
})
export class ReactionsModule {
}
