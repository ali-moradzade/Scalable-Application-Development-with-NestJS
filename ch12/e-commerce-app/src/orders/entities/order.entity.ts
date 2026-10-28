import type {Relation} from 'typeorm';
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn,} from 'typeorm';
import {Product} from '../../products/entities/product.entity.js';
import {User} from '../../users/entities/user.entity.js';

export enum OrderStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    DECLINED = 'DECLINED',
    CANCELLED = 'CANCELLED',
}

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    quantity: number;

    @Column({default: OrderStatus.PENDING})
    status: OrderStatus;

    @Column(
        'decimal', {precision: 5, scale: 2, default: 0}
    )
    totalPrice: number;

    @ManyToOne(
        () => Product,
        (product) => product.orders,
    )
    product: Relation<Product>;

    @ManyToOne(() => User, (user) => user.orders)
    customer: Relation<User>;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;
}
