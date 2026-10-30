import {Module} from '@nestjs/common';
import {UsersService} from './users.service.js';
import {UsersResolver} from './users.resolver.js';
import {MongooseModule} from '@nestjs/mongoose';
import {User, UserSchema} from './schemas/user.schema.js';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema,
            }
        ])
    ],
    providers: [UsersResolver, UsersService],
})
export class UsersModule {
}
