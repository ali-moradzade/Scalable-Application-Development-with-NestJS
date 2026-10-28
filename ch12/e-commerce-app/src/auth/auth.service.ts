import {Injectable} from '@nestjs/common';
import {UsersService} from '../users/users.service.js';
import {JwtService} from '@nestjs/jwt';
import {User} from '../users/entities/user.entity.js';
import bcrypt from 'bcrypt';
import {CreateUserDto} from '../users/dto/create-user.dto.js';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {
    }


    async login(username: string, password: string) {
        const user = await this.usersService.getUserByUsername(username);

        if (!user) {
            return {
                message: 'Invalid username or password',
                data: null,
            };
        }

        const verify = await this.verifyPassword(user, password, user.password);

        if (!verify) {
            return {
                message: 'Invalid username or password',
                data: null,
            };
        }

        const accessToken = await this.jwtService.signAsync({
            sub: user.id,
            username: user.username,
        });

        const {password: _password, ...userWithoutPassword} = user;

        return {
            message: 'Login successful',
            data: {
                ...userWithoutPassword,
                accessToken,
            },
        };
    }


    private async verifyPassword(user: User, password: string, hashedPassword: string) {
        return user && (await bcrypt.compare(
            password, hashedPassword
        ));
    }

    async signUp(createUserDto: CreateUserDto) {
        try {
            const hashedPassword = bcrypt.hashSync(createUserDto.password, 10);
            const newUser: CreateUserDto = {
                ...createUserDto,
                password: hashedPassword,
            };

            return await this.usersService.create(newUser);
        } catch (error) {
            return error;
        }
    }
}
