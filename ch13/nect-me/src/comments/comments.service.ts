import {Injectable} from '@nestjs/common';
import {CreateCommentDto} from './dto/create-comment.dto.js';
import {UpdateCommentDto} from './dto/update-comment.dto.js';
import {InjectModel} from '@nestjs/mongoose';
import {Comment} from './schemas/comment.schema.js';
import {Model} from 'mongoose';

@Injectable()
export class CommentsService {
    constructor(
        @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
    ) {
    }

    create(createCommentDto: CreateCommentDto) {
        const createdComment = new this.commentModel(createCommentDto);
        return createdComment.save();
    }

    findAll() {
        return this.commentModel.find().exec();
    }

    findOne(id: number) {
        return `This action returns a #${id} comment`;
    }

    update(id: number, updateCommentInput: UpdateCommentDto) {
        return `This action updates a #${id} comment`;
    }

    remove(id: number) {
        return `This action removes a #${id} comment`;
    }
}
