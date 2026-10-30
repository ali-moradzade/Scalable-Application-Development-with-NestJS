import {Injectable} from '@nestjs/common';
import {CreatePostDto} from './dto/create-post.dto.js';
import {UpdatePostDto} from './dto/update-post.dto.js';
import {InjectModel} from '@nestjs/mongoose';
import {Post} from './schemas/post.schema.js';
import {Model} from 'mongoose';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post.name) private readonly postModel: Model<Post>,
    ) {
    }

    findAll() {
        return this.postModel.find().exec();
    }

    create(createPostDto: CreatePostDto) {
        const createdPost = new this.postModel(createPostDto);
        return createdPost.save();
    }

    findOne(id: number) {
        return `This action returns a #${id} post`;
    }

    update(id: number, updatePostInput: UpdatePostDto) {
        return `This action updates a #${id} post`;
    }

    remove(id: number) {
        return `This action removes a #${id} post`;
    }
}
