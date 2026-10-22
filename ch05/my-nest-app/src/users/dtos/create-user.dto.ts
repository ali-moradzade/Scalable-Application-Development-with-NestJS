import {IsEmail, IsNotEmpty, IsOptional, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        description: 'The name of the user',
        example: 'John Doe',
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        description: 'The email address of the user',
        example: 'john.doe@example.com',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'The address of the user',
    })
    @IsNotEmpty()
    @IsOptional()
    address?: string;
}
