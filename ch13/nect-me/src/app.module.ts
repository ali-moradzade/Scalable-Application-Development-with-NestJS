import {Module} from '@nestjs/common';
import {AppController} from './app.controller.js';
import {AppService} from './app.service.js';
import {GraphQLModule} from '@nestjs/graphql';
import {join} from 'path';
import {MongooseModule} from '@nestjs/mongoose';
import {UsersModule} from './users/users.module.js';
import {PostsModule} from './posts/posts.module.js';
import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo';
import {CommentsModule} from './comments/comments.module.js';
import {ReactionsModule} from './reactions/reactions.module.js';
import {NotificationsModule} from './notifications/notifications.module.js';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            subscriptions: {
                'graphql-ws': {
                    onConnect: (context) => {

                    },
                    onDisconnect: (context) => {

                    },
                }
            }
        }),
        MongooseModule.forRoot(
            'mongodb://localhost/nectme',
        ),
        UsersModule,
        PostsModule,
        CommentsModule,
        ReactionsModule,
        NotificationsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
