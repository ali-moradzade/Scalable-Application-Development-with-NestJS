import {vi} from 'vitest';
import {INestApplication} from '@nestjs/common';
import {App} from 'supertest/types.js';
import {Test, TestingModule} from '@nestjs/testing';
import {AppModule} from '../../src/app.module.js';
import {
    CREATE_USER_MUTATION,
    CREATE_USER_OPERATION_NAME,
    generateCreateUserVariables
} from '../../src/common/helpers/create-user.helper.js';
import request from 'supertest';
import {GRAPHQL_ENDPOINT} from '../../src/common/helpers/graphql.helper.js';

vi.setConfig({testTimeout: 70000});

describe('UserResolver (e2e)', () => {
    let app: INestApplication<App>;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterEach(async () => {
        await app.close();
    });

    it('should create a user with user mutation', async () => {
        const createUserInput = generateCreateUserVariables().createUserInput;

        const res = await request(app.getHttpServer())
            .post(GRAPHQL_ENDPOINT)
            .send({
                operationName: CREATE_USER_OPERATION_NAME,
                query: CREATE_USER_MUTATION,
                variables: {createUserInput}
            })
            .expect(200);

        expect(res.body.data.createUser).toBeDefined();

        const user = res.body.data.createUser;

        expect(user.id).toBeDefined();
        expect(user.name).toBe(createUserInput.name);
        expect(user.email).toBe(createUserInput.email);
    });
});
