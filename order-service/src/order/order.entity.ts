import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column('jsonb')
  products: { productId: number; quantity: number }[];

  @Column('decimal')
  totalPrice: number;

  @Column()
  status: string; // ex: 'PENDING', 'CONFIRMED', etc.
}
