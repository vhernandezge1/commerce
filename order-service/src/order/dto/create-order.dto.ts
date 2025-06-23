import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  userId: string;

  @IsArray()
  products: {
    productId: number;
    quantity: number;
  }[];
}
