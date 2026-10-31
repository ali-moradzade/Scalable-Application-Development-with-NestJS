import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from './auth.service.js';
import {CreateUserDto} from '../users/dto/create-user.dto.js';
import {LoginUserDto} from './dto/login-user.dto.js';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {
    }

    @Post('signup')
    signup(
        @Body() createUserDto: CreateUserDto,
    ) {
        return this.authService.signUp(createUserDto);
    }

    @Post('login')
    login(
        @Body() loginUserDto: LoginUserDto,
    ) {
        const {username, password} = loginUserDto;
        return this.authService.login(username, password);
    }
}
