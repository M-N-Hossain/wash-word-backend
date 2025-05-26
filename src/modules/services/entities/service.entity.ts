import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SubscriptionService } from '../../subscriptions/entities/subscription-service.entity';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn('uuid', { name: 'services_id' })
  id: string;

  @Column({ name: 'service_name', type: 'varchar' })
  serviceName: string;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'description', type: 'varchar' })
  description: string;

  @OneToMany(() => SubscriptionService, (subService) => subService.service)
  subscriptionServices: SubscriptionService[];
}
