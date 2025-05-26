import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { SubscriptionService } from './subscription-service.entity';

@Entity('subscription')
export class Subscription {
  @PrimaryGeneratedColumn('uuid', { name: 'sub_id' })
  id: string;

  @Column({ name: 'tier_name', type: 'varchar' })
  tierName: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @OneToMany(() => User, (user) => user.subscription)
  users: User[];

  @OneToMany(() => SubscriptionService, (subService) => subService.subscription)
  subscriptionServices: SubscriptionService[];
}
