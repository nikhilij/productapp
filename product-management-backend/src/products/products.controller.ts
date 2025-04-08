import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  import { ProductsService } from './products.service';
  import { CreateProductDto } from './dto/create-product.dto';
  import { UpdateProductDto } from './dto/update-product.dto';
  
  @Controller('products')
  @UseGuards(AuthGuard('jwt'))
  export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
  
    @Post()
    create(@Body() createProductDto: CreateProductDto) {
      return this.productsService.create(createProductDto);
    }
  
    @Get()
    findAll(
      @Query('category') category?: string,
      @Query('minPrice') minPrice?: number,
      @Query('maxPrice') maxPrice?: number,
      @Query('minRating') minRating?: number,
    ) {
      return this.productsService.filterProducts(
        category,
        minPrice,
        maxPrice,
        minRating,
      );
    }
  
    @Get('search')
    search(@Query('q') query: string) {
      return this.productsService.searchProducts(query);
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.productsService.findOne(id);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
      return this.productsService.update(id, updateProductDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.productsService.remove(id);
    }
  }