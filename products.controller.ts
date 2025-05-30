import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@ApiBearerAuth('bearer')
@Controller('products')
export class ProductsController {
  private products = [
    { id: 1, name: 'Milk' },
    { id: 2, name: 'Bread' }
  ];

  @Get()
  @Roles({ roles: ['ProductsApiViewer'] })
  getAll() {
    return this.products;
  }

  @Post()
  @Roles({ roles: ['ProductsApiWriter'] })
  create(@Body() body: { name: string }) {
    const newProduct = { id: Date.now(), name: body.name };
    this.products.push(newProduct);
    return newProduct;
  }

  @Put(':id')
  @Roles({ roles: ['ProductsApiWriter'] })
  update(@Param('id') id: number, @Body() body: { name: string }) {
    const product = this.products.find((p) => p.id === +id);
    if (product) product.name = body.name;
    return product;
  }

  @Delete(':id')
  @Roles({ roles: ['ProductsApiWriter'] })
  delete(@Param('id') id: number) {
    this.products = this.products.filter((p) => p.id !== +id);
    return { deleted: id };
  }
}

