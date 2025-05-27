import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { WashHall } from '../../wash-halls/entities/wash-hall.entity';

@Entity('wash_location')
export class WashLocation {
  @PrimaryGeneratedColumn('uuid', { name: 'location_id' })
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar' })
  city: string;

  @Column({ type: 'varchar' })
  zipcode: string;

  @OneToMany(() => WashHall, (washHall) => washHall.location)
  washHalls: WashHall[];
}
