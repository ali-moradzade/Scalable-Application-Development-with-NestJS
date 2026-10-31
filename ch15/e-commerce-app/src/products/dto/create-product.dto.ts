import {IsDecimal, IsDefined, IsNotEmpty, IsObject, IsString, IsUrl, Length, Validate} from 'class-validator';
import {ProductDescription} from '../custom-validators/ProductDescription.js';
import {ProductSpecs} from '../custom-validators/ProductSpecs.js';

export class CreateProductDto {
    @IsString()
    @Length(5, 25, {
        message: "name must be between 5 and 25 characters"
    })
    name: string;


    @IsString()
    @Length(25, 255, {
        message: "description must be between 25 and 255 characters"
    })
    @Validate(ProductDescription)
    description: string;

    @IsDecimal({
        decimal_digits: '2',
    })
    price: number;

    @IsNotEmpty()
    @IsObject({
        message: 'specs should be a valid object'
    })
    @Validate(ProductSpecs)
    specs: Record<string, string>;

    @IsString()
    @IsUrl({
        require_protocol: true,
    }, {
        message: 'image must be a valid URL',
    })
    image: string;
}
