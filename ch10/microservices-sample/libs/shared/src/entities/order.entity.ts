import {OrderStatus} from '@app/shared';

export class Order {
    id: string;
    name: string;
    product: string;
    price: number;
    status: OrderStatus;
    quantity: number;
}
