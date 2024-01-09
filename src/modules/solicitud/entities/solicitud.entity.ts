import { Ingredient } from '../../ingredients/entities/ingredient.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SolicitudDeCompra } from '../../solicitud-de-compra/entities/solicitud-de-compra.entity';

@Entity()
export class Solicitud {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'int', default: 0 })
  price: number;

  @ManyToOne(() => SolicitudDeCompra, (s) => s.solicitud, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'solicitud_de_compra' })
  solicitudDeCompra: SolicitudDeCompra;

  @ManyToOne(() => Ingredient)
  @JoinColumn({ name: 'id_ingredient' })
  idIngredient: Ingredient;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'create_at',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'update_at',
  })
  updateAt: Date;
}
