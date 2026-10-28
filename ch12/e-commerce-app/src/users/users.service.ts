import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto.js';
import {UpdateUserDto} from './dto/update-user.dto.js';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './entities/user.entity.js';
import {Repository} from 'typeorm';
import {PaginationService} from '../common/pagination/pagination.service.js';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
        private readonly paginationService: PaginationService,
    ) {
    }

    async create(createUserDto: CreateUserDto) {
        try {
            const newUser = this.usersRepository.create(createUserDto);
            await this.usersRepository.save(newUser);

            return newUser;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async getAllUsers(page = 1, limit=10) {
        const users = await this.usersRepository.find({
            skip: (page - 1) * limit,
            take: limit,
            relations: {
                orders: true,
            }
        })

        const totalItems = await this.usersRepository.count();
        const meta = this.paginationService.getPaginationMeta(page, limit, totalItems);

        return {
            users,
            meta,
        }
    }

    async getUserById(id: string) {
        return await this.usersRepository.findOne({
            where: {id},
            relations: {
                orders: true,
            }
        });
    }

    async getUserByUsername(username: string) {
        return await this.usersRepository.findOne({
            where: {username},
            relations: {
                orders: true,
            }
        });
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
