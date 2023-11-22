import { Product } from '../../product/entities/product.entity';
import { Ingredient } from '../../ingredients/entities/ingredient.entity';
import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class IngredientUsage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => Ingredient)
  @JoinColumn()
  ingredient: Ingredient;

  @ManyToOne(() => Product)
  @JoinColumn()
  product: Product;
}
