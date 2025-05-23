import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Wash {
  @PrimaryGeneratedColumn()
  wash_id: number;

  @Column()
  wash_location: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  wash_date: Date;

  @ManyToOne(() => User, (user) => user.washes)
  user: User;
}
