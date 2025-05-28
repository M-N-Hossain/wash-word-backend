import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Membership } from 'src/common/enums/membership.enum';
import { Repository } from 'typeorm';
import { MembershipService } from './entities/membership-service.entity';
import { Service } from './entities/service.entity';

@Injectable()
export class ServicesService implements OnModuleInit {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
    @InjectRepository(MembershipService)
    private membershipServiceRepository: Repository<MembershipService>,
  ) {}

  async onModuleInit() {
    // Seed services data if none exists
    const servicesCount = await this.serviceRepository.count();
    if (servicesCount === 0) {
      await this.seedServices();
    }

    // Seed membership services data if none exists
    const membershipServicesCount =
      await this.membershipServiceRepository.count();
    if (membershipServicesCount === 0) {
      await this.seedMembershipServices();
    }
  }

  async findAll(): Promise<Service[]> {
    return this.serviceRepository.find();
  }

  async findOne(id: string): Promise<Service> {
    return this.serviceRepository.findOne({ where: { id } });
  }

  async getServicesByMembership(membershipType: Membership): Promise<any[]> {
    // Get all services
    const allServices = await this.findAll();

    // Get membership services mapping
    const membershipServices = await this.membershipServiceRepository.find({
      where: { membershipType },
    });

    // Map services with included flag
    return allServices.map((service) => {
      const membershipService = membershipServices.find(
        (ms) => ms.serviceId === service.id,
      );

      return {
        ...service,
        isIncluded: membershipService ? membershipService.isIncluded : false,
      };
    });
  }

  private async seedServices() {
    const services = [
      {
        name: 'Shampoo',
        description: 'Car shampoo cleaning',
        serviceName: 'Shampoo',
      },
      {
        name: 'Drying',
        description: 'Full car drying',
        serviceName: 'Drying',
      },
      {
        name: 'Brush washing',
        description: 'Exterior brush washing',
        serviceName: 'Brush washing',
      },
      {
        name: 'High-pressure flushing',
        description: 'High-pressure water cleaning',
        serviceName: 'High-pressure flushing',
      },
      {
        name: 'Wheel wash',
        description: 'Specialized wheel cleaning',
        serviceName: 'Wheel wash',
      },
      {
        name: 'Rinsing wax',
        description: 'Protective wax coating',
        serviceName: 'Rinsing wax',
      },
      {
        name: 'Undercarriage wash',
        description: 'Cleaning car undercarriage',
        serviceName: 'Undercarriage wash',
      },
      {
        name: 'Polishing',
        description: 'Car surface polishing',
        serviceName: 'Polishing',
      },
      {
        name: 'Insect repellent',
        description: 'Apply insect repellent coating',
        serviceName: 'Insect repellent',
      },
      {
        name: 'Degreasing',
        description: 'Engine and underbody degreasing',
        serviceName: 'Degreasing',
      },
      {
        name: 'Foam Splash',
        description: 'Specialized foam cleaning',
        serviceName: 'Foam Splash',
      },
      {
        name: 'Extra drying',
        description: 'Additional drying service',
        serviceName: 'Extra drying',
      },
    ];

    for (const service of services) {
      await this.serviceRepository.save(service);
    }

    console.log('✅ Services seeded successfully');
  }

  private async seedMembershipServices() {
    // Get all services
    const services = await this.findAll();

    // Gold membership services
    const goldServices = [
      'Shampoo',
      'Drying',
      'Brush washing',
      'High-pressure flushing',
      'Wheel wash',
      'Rinsing wax',
    ];

    // Premium membership services
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

    // Brillant membership services
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

    // Create mappings
    for (const service of services) {
      // Gold membership
      await this.membershipServiceRepository.save({
        membershipType: Membership.GOLD,
        serviceId: service.id,
        isIncluded: goldServices.includes(service.name),
      });

      // Premium membership
      await this.membershipServiceRepository.save({
        membershipType: Membership.PREMIUM,
        serviceId: service.id,
        isIncluded: premiumServices.includes(service.name),
      });

      // Brillant membership
      await this.membershipServiceRepository.save({
        membershipType: Membership.BRILLANT,
        serviceId: service.id,
        isIncluded: brillantServices.includes(service.name),
      });
    }

    console.log('✅ Membership services seeded successfully');
  }
}
