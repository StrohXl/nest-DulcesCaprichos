import { User } from '../../user/entities/user.entity';
import { Solicitud } from '../../solicitud/entities/solicitud.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Column,
} from 'typeorm';

@Entity()
export class SolicitudDeCompra {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @OneToMany(() => Solicitud, (solicitud) => solicitud.solicitudDeCompra, {
    onDelete: 'CASCADE',
  })
  solicitud: Solicitud[];

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int', default: 0 })
  money: number;

  @Column({ type: 'int', default: 0 })
  remaining: number;

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
