import { Membership } from 'src/common/enums/membership.enum';
import { Wash } from 'src/modules/wash/entities/wash.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  licensePlate: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  membership: Membership;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => Wash, (wash) => wash.user)
  washes: Wash[];
}
