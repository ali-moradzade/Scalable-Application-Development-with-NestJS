import {Module} from '@nestjs/common';
import {AppResolver} from './app.resolver.js';
import {AppService} from './app.service.js';
import {GraphQLModule} from '@nestjs/graphql';
import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo';
import {join} from 'path';
import {ApolloServerPluginLandingPageLocalDefault} from '@apollo/server/plugin/landingPage/default';
import { UsersModule } from './users/users.module.js';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            playground: false,
            plugins: [
                ApolloServerPluginLandingPageLocalDefault(),
            ],
            subscriptions: {
                'graphql-ws': true,
            },
        }),
        UsersModule
    ],
    controllers: [],
    providers: [
        AppService,
        AppResolver,
    ],
})
export class AppModule {
}
