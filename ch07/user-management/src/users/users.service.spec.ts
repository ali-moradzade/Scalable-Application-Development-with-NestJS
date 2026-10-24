import {UsersService} from './users.service.js';
import {Test, TestingModule} from '@nestjs/testing';
import {CreateUserDto} from './dtos/create-user.dto.js';
import {expect} from 'vitest';

describe('UsersService', () => {
    let service: UsersService;
    const mockExternalUserDataService = {
        fetchUsers: vi.fn().mockResolvedValue([]),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: 'EXTERNAL_USER_DATA_SERVICE',
                    useValue: mockExternalUserDataService,
                },
            ]
        }).compile();

        service = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createUser', () => {
        const newUser: CreateUserDto = {
            name: 'Kitoko Mwana',
            email: 'kitoko@test.com',
            address: '1234, Lubumbashi, DRC',
        };

        test('should create a new user', () => {
            const user = service.createUser(newUser);

            expect(user).toBeDefined();
            expect(user.name).toBe(newUser.name);
            expect(user.email).toBe(newUser.email);
            expect(user.id).toBe(5);
        });
    });

    describe('findAll', () => {
        it('should return an array of users', async () => {
            const users = await service.findAll();

            expect(users.length).toBeGreaterThan(0);
            expect(users[0].name).toBeDefined();
            expect(users[0].email).toBe('tshim@myapp.com');
            expect(users[1].address).not.toBeDefined();
        });

        it('should return an array of users with pagination', () => {
            const users = service.findAllV2(1, 2);

            expect(users.data.length).toBe(2);
            expect(users.data[0].name).toBeDefined();
            expect(users.meta).not.toBeNull();
            expect(users.meta.page).toBe(1);
            expect(users.meta.limit).toBe(2);
            expect(users.meta.total).toBe(4);
        });

        it('should be null by a wrong page number', () => {
            const users = service.findAllV2(100, 2);

            expect(users.data.length).toBe(0);
            expect(users.meta).not.toBeNull();
        });
    });

    describe('updateUser', () => {
        it('should update a user', () => {
            const user = service.updateUser({
                name: 'Tshimanga MUKENDI John',
                id: 1
            });

            expect(user).toBeDefined();
            expect(user.name).toBe('Tshimanga MUKENDI John');
            expect(user.email).toBe('tshim@myapp.com');
        });

        it('should throw a NotFoundException for non-existing user', () => {
            expect(() => {
                service.updateUser({
                    name: 'Tshimanga MUKENDI John',
                    id: 100
                });
            }).toThrow(/not found/);
        });
    });
});
