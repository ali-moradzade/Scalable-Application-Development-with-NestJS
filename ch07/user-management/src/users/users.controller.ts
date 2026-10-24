import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
    ValidationPipe,
    Version
} from '@nestjs/common';
import {UsersService} from './users.service.js';
import {CreateUserDto} from './dtos/create-user.dto.js';
import {UpdateUserDto} from './dtos/update-user.dto.js';
import {MockAuthGuard} from '../auth/mock-auth.guard.js';
import {ApiOkResponse, ApiOperation, ApiTags} from '@nestjs/swagger';
import {UserEntity} from './entities/user.entity.js';

@ApiTags('Users')
@Controller({
    path: 'users',
    version: '1',
})
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) {
    }

    @Version('1')
    @Get()
    findAll() {
        console.log('Version 1');
        return this.usersService.findAll();
    }

    @Get()
    @Version('2')
    async findAllV2() {
        return this.usersService.findAllV2();
    }

    @ApiOperation({summary: 'Retrieve a user by ID'})
    @ApiOkResponse({
        description: 'The user has been successfully retrieved.',
        type: UserEntity,
    })
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<UserEntity> {
        return this.usersService.findOne(+id);
    }

    @ApiOperation({
        summary: 'Create a new user'
    })
    @ApiOkResponse({
        description: 'The user has been successfully created',
        type: UserEntity,
    })
    @Post()
    @UseGuards(MockAuthGuard)
    createUser(
        @Body(new ValidationPipe()) createUserDto: CreateUserDto,
    ) {
        return this.usersService.createUser(createUserDto);
    }

    @Patch(':id')
    @UseGuards(MockAuthGuard)
    updateUser(
        @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
        @Param('id', ParseIntPipe) id: string,
    ) {
        return this.usersService.updateUser({
            ...updateUserDto,
            id: +id,
        });
    }
}
