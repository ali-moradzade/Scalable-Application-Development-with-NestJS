import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto.js';
import {UpdateUserInput} from './dto/update-user.input.js';
import {InjectModel} from '@nestjs/mongoose';
import {User} from './schemas/user.schema.js';
import {Model} from 'mongoose';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) {
    }

    create(createUserDto: CreateUserDto) {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    findAll() {
        return this.userModel.find().exec();
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    update(id: number, updateUserInput: UpdateUserInput) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
