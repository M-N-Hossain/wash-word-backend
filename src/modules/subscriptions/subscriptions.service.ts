import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from '../services/entities/service.entity';
import { SubscriptionService as SubService } from './entities/subscription-service.entity';
import { Subscription } from './entities/subscription.entity';

@Injectable()
export class SubscriptionsService implements OnModuleInit {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
    @InjectRepository(SubService)
    private subscriptionServiceRepository: Repository<SubService>,
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) {}

  async onModuleInit() {
    // Seed subscriptions and services if none exist
    const subscriptionsCount = await this.subscriptionRepository.count();
    const servicesCount = await this.serviceRepository.count();

    if (servicesCount === 0) {
      await this.seedServices();
    }

    if (subscriptionsCount === 0) {
      await this.seedSubscriptions();
    }
  }

  async findAll(): Promise<Subscription[]> {
    return this.subscriptionRepository.find();
  }

  async findOne(id: string): Promise<Subscription> {
    return this.subscriptionRepository.findOne({
      where: { id },
      relations: ['subscriptionServices', 'subscriptionServices.service'],
    });
  }

  async getSubscriptionServices(subscriptionId: string): Promise<SubService[]> {
    return this.subscriptionServiceRepository.find({
      where: { subscriptionId },
      relations: ['service'],
    });
  }

  private async seedServices() {
    const services = [
      { serviceName: 'Shampoo' },
      { serviceName: 'Drying' },
      { serviceName: 'Brush washing' },
      { serviceName: 'High-pressure flushing' },
      { serviceName: 'Wheel wash' },
      { serviceName: 'Rinsing wax' },
      { serviceName: 'Undercarriage wash' },
      { serviceName: 'Polishing' },
      { serviceName: 'Insect repellent' },
      { serviceName: 'Degreasing' },
      { serviceName: 'Foam Splash' },
      { serviceName: 'Extra drying' },
    ];

    for (const service of services) {
      await this.serviceRepository.save(service);
    }

    console.log('✅ Services seeded successfully');
  }

  private async seedSubscriptions() {
    // Create subscription tiers
    const subscriptions = [
      {
        tierName: 'GOLD',
        description: 'Basic car wash subscription',
        price: 9.99,
      },
      {
        tierName: 'PREMIUM',
        description: 'Advanced car wash subscription',
        price: 19.99,
      },
      {
        tierName: 'BRILLANT',
        description: 'Complete car wash package',
        price: 29.99,
      },
    ];

    for (const sub of subscriptions) {
      await this.subscriptionRepository.save(sub);
    }

    // Get all services and subscriptions for mapping
    const allServices = await this.serviceRepository.find();
    const allSubscriptions = await this.subscriptionRepository.find();

    // Gold subscription services
    const goldServices = [
      'Shampoo',
      'Drying',
      'Brush washing',
      'High-pressure flushing',
      'Wheel wash',
      'Rinsing wax',
    ];

    // Premium subscription services
    const premiumServices = [
      'Shampoo',
      'Drying',
      'Brush washing',
      'High-pressure flushing',
      'Wheel wash',
      'Rinsing wax',
      'Undercarriage wash',
      'Polishing',
    ];

    // Brillant subscription services
    const brillantServices = [
      'Shampoo',
      'Drying',
      'Brush washing',
      'High-pressure flushing',
      'Wheel wash',
      'Rinsing wax',
      'Undercarriage wash',
      'Polishing',
      'Insect repellent',
      'Degreasing',
      'Foam Splash',
      'Extra drying',
    ];

    const goldSub = allSubscriptions.find((s) => s.tierName === 'GOLD');
    const premiumSub = allSubscriptions.find((s) => s.tierName === 'PREMIUM');
    const brillantSub = allSubscriptions.find((s) => s.tierName === 'BRILLANT');

    // Create mappings
    for (const service of allServices) {
      // Gold subscription
      if (goldSub) {
        await this.subscriptionServiceRepository.save({
          subscriptionId: goldSub.id,
          serviceId: service.id,
        });
      }

      // Premium subscription
      if (premiumSub) {
        await this.subscriptionServiceRepository.save({
          subscriptionId: premiumSub.id,
          serviceId: service.id,
        });
      }

      // Brillant subscription
      if (brillantSub) {
        await this.subscriptionServiceRepository.save({
          subscriptionId: brillantSub.id,
          serviceId: service.id,
        });
      }
    }

    console.log('✅ Subscriptions and service mappings seeded successfully');
  }
}
