import { Controller, Get } from '@nestjs/common';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Controller('products')
export class ProductsController {
  private readonly products: Product[] = [
    { id: 1, name: 'Chaise', price: 20 },
    { id: 2, name: 'Table', price: 50 },
    { id: 3, name: 'Lampe', price: 15 },
  ];

  @Get()
  findAll(): Product[] {
    return this.products;
  }
}
