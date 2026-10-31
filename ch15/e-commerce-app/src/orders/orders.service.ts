import {Injectable} from '@nestjs/common';
import {CreateOrderDto} from './dto/create-order.dto.js';
import {UpdateOrderDto} from './dto/update-order.dto.js';
import {InjectRepository} from '@nestjs/typeorm';
import {Order} from './entities/order.entity.js';
import {Repository} from 'typeorm';
import {Product} from '../products/entities/product.entity.js';
import {PaginationService} from '../common/pagination/pagination.service.js';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
        private readonly paginationService: PaginationService,
    ) {
    }

    async create(createOrderDto: CreateOrderDto) {
        try {
            const {productId, quantity, totalPrice} = createOrderDto;

            const product = await this.productRepository.findOne({
                where: {
                    id: productId,
                }
            });

            if (!product) {
                return {
                    message: 'Product not found!',
                };
            }

            const order = this.orderRepository.create({
                product,
                quantity,
                totalPrice,
            });

            await this.orderRepository.save(order);

            return {
                message: 'Order created successfully',
                order,
            };
        } catch (error) {
            return {
                message: 'An error occurred',
                error,
            };
        }
    }

    async getOrders(page = 1, limit = 10) {
        const orders = await this.orderRepository.find({
            skip: (page - 1) * limit,
            take: limit,
            relations: {
                product: true,
            }
        });

        const totalItems = await this.orderRepository.count();
        const meta = this.paginationService.getPaginationMeta(page, limit, totalItems);

        return {
            orders,
            meta,
        };
    }

    async getOrderById(id: string) {
        const order = await this.orderRepository.findOne({
            where: {id},
            relations: {
                product: true,
            }
        });

        return {
            order,
        };
    }

    update(id: number, updateOrderDto: UpdateOrderDto) {
        return `This action updates a #${id} order`;
    }

    remove(id: number) {
        return `This action removes a #${id} order`;
    }
}
