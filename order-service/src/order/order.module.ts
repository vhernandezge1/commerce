import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    HttpModule, // pour appeler cart-service et product-service
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
