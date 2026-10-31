import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Order} from '../../orders/entities/order.entity.js';
import type {Relation} from 'typeorm';

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
    MERCHANT = 'merchant',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    email: string;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @OneToMany(() => Order, (order) => order.customer)
    orders: Relation<Order[]>;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    })
    role: UserRole;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;
}
