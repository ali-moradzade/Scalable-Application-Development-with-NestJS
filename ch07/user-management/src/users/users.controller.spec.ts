import {Test, TestingModule} from '@nestjs/testing';
import {UsersController} from './users.controller.js';
import {UsersService} from './users.service.js';
import {CreateUserDto} from './dtos/create-user.dto.js';
import {UserEntity} from './entities/user.entity.js';
import {UpdateUserDto} from './dtos/update-user.dto.js';

describe('users.controller', () => {
    let usersController: UsersController;
    let usersServiceMock: Partial<UsersService>;

    beforeEach(async () => {
        usersServiceMock = {
            createUser: vi.fn((dto: CreateUserDto) => ({
                ...dto,
                id: Date.now(),
            })),
            findAll: vi.fn(),
            findAllV2: vi.fn(),
            findOne: vi.fn(),
            updateUser: vi.fn(),
        };

        const moduleFixture: TestingModule = await Test.createTestingModule({
            controllers: [
                UsersController,
            ],
            providers: [
                {
                    provide: UsersService,
                    useValue: usersServiceMock,
                }
            ]
        }).compile();

        usersController = moduleFixture.get<UsersController>(UsersController);
    });

    describe('createUser', () => {
        it('should call UsersService to create a user', () => {
            const createUserDto: CreateUserDto = {
                name: 'John Doe',
                email: 'john@example.com',
            };

            const user = usersController.createUser(createUserDto);

            expect(usersServiceMock.createUser).toHaveBeenCalledWith(createUserDto);
            expect(user).toEqual({
                ...createUserDto,
                id: expect.any(Number),
            });
            expect(user.id).toBeDefined();
        });
    });

    describe('findAll', () => {
        it('should return all users', async () => {
            const users: UserEntity[] = [
                {
                    id: 1,
                    name: 'Justin Dusenge',
                    email: 'justin@example.com',
                },
            ];

            vi.mocked(usersServiceMock.findAll!).mockResolvedValue(users);

            await expect(usersController.findAll()).resolves.toEqual(users);

            expect(usersServiceMock.findAll).toHaveBeenCalledOnce();
        });
    });

    describe('findAllV2', () => {
        it('should return all the paginated users', async () => {
            const result = {
                data: [
                    {
                        id: 1,
                        name: 'Justin Dusenge',
                        email: 'justin@example.com',
                    },
                ],
                meta: {
                    page: 1,
                    limit: 10,
                    total: 1,
                },
            };

            vi.mocked(usersServiceMock.findAllV2!).mockResolvedValue(result);

            await expect(usersController.findAllV2()).resolves.toEqual(result);

            expect(usersServiceMock.findAllV2).toHaveBeenCalledOnce();
        });
    });

    describe('findOne', () => {
        it('should return the user with this id', async () => {
            const user: UserEntity = {
                id: 5,
                name: 'Justin Dusenge',
                email: 'justin@example.com',
            };

            vi.mocked(usersServiceMock.findOne!).mockResolvedValue(user);

            await expect(usersController.findOne('5')).resolves.toEqual(user);

            expect(usersServiceMock.findOne).toHaveBeenCalledWith(5);
        });
    });

    describe('updateUser', () => {
        it('should update the user', async () => {
            const dto: UpdateUserDto = {
                name: 'Justin Updated',
            };

            const updatedUser: UserEntity = {
                id: 5,
                name: 'Justin Updated',
                email: 'justin@example.com',
            };

            vi.mocked(usersServiceMock.updateUser!).mockReturnValue(updatedUser);

            expect(usersController.updateUser(dto, '5')).toEqual(updatedUser);

            expect(usersServiceMock.updateUser).toHaveBeenCalledWith({
                ...dto,
                id: 5,
            });
        });
    });
});
