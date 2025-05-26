import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { WashLocation } from '../../locations/entities/wash-location.entity';

@Entity('wash_halls')
export class WashHall {
  @PrimaryGeneratedColumn('uuid', { name: 'hall_id' })
  id: string;

  @Column({ name: 'hall_name', type: 'varchar' })
  hallName: string;

  @Column({ type: 'boolean', default: false })
  maintenance: boolean;

  @Column({ type: 'boolean', default: false })
  occupied: boolean;

  @ManyToOne(() => WashLocation, (location) => location.washHalls)
  @JoinColumn({ name: 'fk_location_id' })
  location: WashLocation;

  @Column({ name: 'fk_location_id' })
  locationId: string;
}
