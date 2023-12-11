import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { SolicitudDeCompra } from '../../solicitud-de-compra/entities/solicitud-de-compra.entity';
import { Ingredient } from '../../ingredients/entities/ingredient.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  firstName: string;

  @Column({ type: 'varchar', length: 100 })
  lastName: string;

  @Column({ type: 'varchar', length: 200, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 200 })
  password: string;

  @Column({ type: 'int', default: 1000 })
  money: number;

  @OneToMany(() => Ingredient, (ingredients) => ingredients.user, {
    onDelete: 'CASCADE',
  })
  ingredients: Ingredient[];

  @OneToMany(() => SolicitudDeCompra, (solicitud) => solicitud.user)
  @JoinColumn({ name: 'solicitudes_de_compra' })
  solicitudesDeCompra: SolicitudDeCompra[];

  @Exclude()
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;
}
