import {Injectable} from '@nestjs/common';
import {CreateReactionDto} from './dto/create-reaction.dto.js';
import {UpdateReactionDto} from './dto/update-reaction.dto.js';
import {InjectModel} from '@nestjs/mongoose';
import {Reaction} from './schemas/reaction.schema.js';
import {Model} from 'mongoose';

@Injectable()
export class ReactionsService {
    constructor(
        @InjectModel(Reaction.name) private readonly reactionModel: Model<Reaction>,
    ) {
    }

    create(createReactionDto: CreateReactionDto) {
        const createdReaction = new this.reactionModel(createReactionDto);
        return createdReaction.save();
    }

    findAll() {
        return this.reactionModel.find().exec();
    }

    findOne(id: number) {
        return `This action returns a #${id} reaction`;
    }

    update(id: number, updateReactionInput: UpdateReactionDto) {
        return `This action updates a #${id} reaction`;
    }

    remove(id: number) {
        return `This action removes a #${id} reaction`;
    }
}
