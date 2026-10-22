import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {UserEntity} from './entities/user.entity.js';
import {CreateUserDto} from './dtos/create-user.dto.js';
import {UpdateUserDto} from './dtos/update-user.dto.js';
import {ExternalUserDataService} from '../external-services/external-user-data.service.js';

@Injectable()
export class UsersService {
    private readonly users: UserEntity[] = [
        {
            id: 1,
            name: 'Tshimanga Mukendi',
            email: 'tshim@myapp.com'
        },
        {
            id: 2,
            name: 'Kasereka Akim',
            email: 'kase@myapp.com'
        },
        {
            id: 3,
            name: 'Ushindi Joseph',
            email: 'ushindi@myapp.com',
            address: '1234, Kinshasa, DRC',
        },
        {
            id: 4,
            name: 'Kabeya Jean',
            email: 'kabeya@myapp.com',
            address: '1234, Goma, DRC',
        },
    ];

    constructor(
        @Inject('EXTERNAL_USER_DATA_SERVICE') private readonly externalUserDataService: ExternalUserDataService,
    ) {
    }

    async findAll(): Promise<UserEntity[]> {
        const externalUsers = await this.externalUserDataService.fetchUsers();

        return [
            ...this.users,
            ...externalUsers,
        ];
    }

    findAllV2(page = 1, limit = 10) {
        const start = (page - 1) * limit;
        const end = page * limit;

        return {
            data: this.users.slice(start, end),
            meta: {
                page,
                limit,
                total: this.users.length,
            }
        };
    }

    findOne(id: number): UserEntity {
        const user = this.users.find(user => user.id === id);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    createUser(user: CreateUserDto) {
        this.users.push({
            ...user,
            id: this.users.length + 1,
        });
    }

    updateUser(user: UpdateUserDto & { id: number }) {
        const index = this.users.findIndex(
            (u) => u.id === user.id
        );

        if (index === -1) {
            throw new NotFoundException('User not found');
        }

        this.users[index] = {
            name: user.name ?? this.users[index].name,
            email: user.email ?? this.users[index].email,
            id: this.users[index].id,
        };
    }
}
