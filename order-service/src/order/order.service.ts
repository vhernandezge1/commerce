import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    private readonly http: HttpService,
  ) {}

  async create(dto: CreateOrderDto) {
    // 1. Récupérer le panier de l'utilisateur depuis cart-service
    const cartRes = await firstValueFrom(
      this.http.get(`http://localhost:3000/cart/${dto.userId}`)
    );

    const cartItems = cartRes.data;

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      throw new HttpException('Panier vide', HttpStatus.BAD_REQUEST);
    }

    // 2. Récupérer les infos produits depuis product-service
    const productRes = await firstValueFrom(
      this.http.get('http://localhost:3001/products')
    );
    const products = productRes.data;

    // 3. Calcul du prix total
    let total = 0;
    for (const item of cartItems) {
      const found = products.find((p) => p.id === item.productId);
      if (!found) {
        throw new HttpException(
          `Produit ${item.productId} introuvable`,
          HttpStatus.BAD_REQUEST,
        );
      }
      total += item.quantity * found.price;
    }

    // 4. Sauvegarder la commande
    const newOrder = this.orderRepo.create({
      userId: dto.userId,
      products: cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      totalPrice: total,
      status: 'PENDING',
    });

    const saved = await this.orderRepo.save(newOrder);

    return saved;
  }
}
