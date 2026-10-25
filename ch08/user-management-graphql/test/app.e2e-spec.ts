import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import request from 'supertest';
import {App} from 'supertest/types.js';
import {AppModule} from './../src/app.module.js';
import {expect, vi} from 'vitest';
import {
    GET_HELLO,
    GET_HELLO_OPERATION_NAME,
    GRAPHQL_ENDPOINT,
    HELL0_WORLD
} from '../src/common/helpers/graphql.helper.js';

vi.setConfig({testTimeout: 70000});

describe('AppResolver (e2e)', () => {
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

    describe('/graphql', () => {
        it('should get a Hello World', async () => {
            const res = await request(app.getHttpServer())
                .post(GRAPHQL_ENDPOINT)
                .send({
                    operationName: GET_HELLO_OPERATION_NAME,
                    query: GET_HELLO,
                })
                .expect(200)

            expect(res.body.data.getHello).toEqual(HELL0_WORLD);
        });
    });
});
