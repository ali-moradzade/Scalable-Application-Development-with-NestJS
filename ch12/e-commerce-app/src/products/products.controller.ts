import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {ProductsService} from './products.service.js';
import {CreateProductDto} from './dto/create-product.dto.js';
import {UpdateProductDto} from './dto/update-product.dto.js';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {
    }

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }

    @Get()
    findAll(
        @Query('page') page: number,
        @Query('limit') limit: number,
    ) {
        return this.productsService.getProducts(page, limit);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productsService.getProductById(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.productsService.update(+id, updateProductDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productsService.remove(+id);
    }
}
