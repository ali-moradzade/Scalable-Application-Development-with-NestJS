import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication, VersioningType} from '@nestjs/common';
import request from 'supertest';
import {App} from 'supertest/types.js';
import {AppModule} from '../../src/app.module.js';
import {expect} from 'vitest';

describe('Users (e2e)', () => {
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

    describe('POST /v1/users', () => {
        it('should create a new user', async () => {
            const name = 'Justin Dusenge';
            const email = 'justin@example.com';

            const res = await request(app.getHttpServer())
                .post('/v1/users')
                .set('Authorization', 'Bearer mock-token')
                .send({
                    name,
                    email
                })
                .expect(201);

            expect(res.body).toHaveProperty('data');
            expect(res.body.data.name).toEqual(name);
            expect(res.body.data.email).toEqual(email);
        });
    });

    describe('GET /v1/users', () => {
        it('should retrieve all the users', async () => {
            const res = await request(app.getHttpServer())
                .get('/v1/users')
                .expect(200);

            const {data, success, timestamp} = res.body;

            expect(success).toBe(true);
            expect(Array.isArray(data)).toBe(true);

            expect(data[0]).not.toHaveProperty('address');
        });
    });

    describe('GET /v2/users', () => {
        it('should retrieve all the paginated users', async () => {
            const res = await request(app.getHttpServer())
                .get('/v2/users')
                .expect(200);

            const {data, success, timestamp} = res.body;

            expect(success).toBe(true);
            expect(data.data.length).toBeGreaterThan(2);
            expect(data).toHaveProperty('meta');
            expect(data.meta).toHaveProperty('total');
            expect(data.meta.limit).toBe(10);
            expect(data.meta.page).toBe(1);
        });
    });
});

