import {Body, Controller, Delete, Get, Param, Patch, Query} from '@nestjs/common';
import {UsersService} from './users.service.js';
import {UpdateUserDto} from './dto/update-user.dto.js';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) {
    }

    @Get()
    findAll(
        @Query('page') page: number,
        @Query('limit') limit: number,
    ) {
        return this.usersService.getAllUsers(page, limit);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.getUserById(id);
    }

    @Get('username/:username')
    findByUsername(@Param('username') username: string) {
        return this.usersService.getUserByUsername(username);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}
