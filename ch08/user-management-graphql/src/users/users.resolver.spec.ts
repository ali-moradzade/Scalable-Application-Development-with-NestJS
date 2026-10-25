import {Test, TestingModule} from '@nestjs/testing';
import {UsersResolver} from './users.resolver.js';
import {UsersService} from './users.service.js';
import {expect, vi} from 'vitest';
import {User} from './entities/user.entity.js';
import {CreateUserInput} from './dto/create-user.input.js';

describe('UsersResolver', () => {
    let resolver: UsersResolver;
    const usersMock: User[] = [
        {
            id: 1,
            name: 'Tshimanga Mukendi',
            email: 'tshim@myapp.com',
        },
        {
            id: 2,
            name: 'Kasereka Akim',
            email: 'kase@myapp.com',
        },
    ];

    const usersServiceMock: Partial<UsersService> = {
        findAll: vi.fn(() => {
            return usersMock;
        }),
        findOne: vi.fn((id: number) => {
            return usersMock.find(user => user.id === id);
        }),
        create: vi.fn((createUserInput: CreateUserInput) => ({
            id: Date.now(),
            ...createUserInput,
        })),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersResolver,
                {
                    provide: UsersService,
                    useValue: usersServiceMock,
                }
            ],
        }).compile();

        resolver = module.get<UsersResolver>(UsersResolver);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('create', () => {
        it('should create a user', () => {
            const dto = {
                name: 'Ushindi Joseph',
                email: 'ushindi@myapp.com',
            };

            const user = resolver.createUser(dto);

            expect(user).toEqual({
                id: expect.any(Number),
                ...dto,
            });
            expect(usersServiceMock.create).toHaveBeenCalledWith(dto);
        });
    });

    describe('findAll', () => {
        it('should return an array of users', async () => {
            const users = resolver.findAll();

            expect(users).toBeInstanceOf(Array);
            expect(users.length).toEqual(usersMock.length);
        });
    });

    describe('findOne', () => {
        it('should find an existing user', () => {
            const id = usersMock[0].id;

            const user = usersServiceMock.findOne!(id);

            expect(user).toBeDefined();
            expect(user?.name).toEqual(usersMock[0].name);
        });

        it("should return undefined if user doesn't exist", () => {
            const id = Date.now();

            const user = usersServiceMock.findOne!(id);

            expect(user).toBeUndefined();
        })
    });
});
