import {IsDecimal, IsPositive, IsString, IsUUID} from 'class-validator';

export class CreateOrderDto {
    @IsString()
    // @IsUUID('all', {message: 'customerId must be a valid UUID'})
    customerId: string;

    @IsString()
    @IsUUID('all', {message: 'productId must be a valid UUID'})
    productId: string;

    @IsPositive()
    quantity: number;

    @IsDecimal({decimal_digits: '2'})
    totalPrice: number;
}
