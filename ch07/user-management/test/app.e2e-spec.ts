import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication, VersioningType} from '@nestjs/common';
import request from 'supertest';
import {App} from 'supertest/types.js';
import {AppModule} from './../src/app.module.js';
import {expect} from 'vitest';

describe('AppController (e2e)', () => {
    let app: INestApplication<App>;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        app.enableVersioning({
            type: VersioningType.URI,
        });

        await app.init();
    });

    it('/ (GET)', () => {
        return request(app.getHttpServer())
            .get('/v1')
            .expect(200)
            .expect(res => {
                expect(res.body.success).toBe(true);
                expect(res.body.data).toBe('Hello World!');
                expect(res.body.timestamp).toBeDefined();
            });
    });

    afterEach(async () => {
        await app.close();
    });
});
