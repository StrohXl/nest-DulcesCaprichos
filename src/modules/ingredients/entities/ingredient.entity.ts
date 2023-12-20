import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { IngredientUsage } from '../../ingredient-usage/entities/ingredient-usage.entity';
import { Solicitud } from '../../solicitud/entities/solicitud.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 200,
    default: '',
  })
  description: string;

  @Column({ type: 'int' })
  price: number;

  @ManyToOne(() => User, (user) => user.ingredients, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'varchar', default: '' })
  imageUrl: string;

  @OneToMany(
    () => IngredientUsage,
    (ingredientUsage) => ingredientUsage.ingredient,
  )
  @JoinColumn({ name: 'ingredient_usage' })
  ingredientUsage: IngredientUsage[];

  @OneToMany(() => Solicitud, (solicitud) => solicitud.idIngredient)
  solicitudes: Solicitud[];

  @Exclude()
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'create_at',
  })
  createAt: Date;

  @Exclude()
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'update_at',
  })
  updateAt: Date;
}
