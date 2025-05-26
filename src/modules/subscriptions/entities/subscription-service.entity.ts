import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Service } from '../../services/entities/service.entity';
import { Subscription } from './subscription.entity';

@Entity('subscription_services')
export class SubscriptionService {
  @PrimaryGeneratedColumn('uuid', { name: 'subscription_service_id' })
  id: string;

  @ManyToOne(
    () => Subscription,
    (subscription) => subscription.subscriptionServices,
  )
  @JoinColumn({ name: 'fk_sub_id' })
  subscription: Subscription;

  @Column({ name: 'fk_sub_id' })
  subscriptionId: string;

  @ManyToOne(() => Service, (service) => service.subscriptionServices)
  @JoinColumn({ name: 'fk_services_id' })
  service: Service;

  @Column({ name: 'fk_services_id' })
  serviceId: string;
}
