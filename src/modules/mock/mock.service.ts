import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Membership } from 'src/common/enums/membership.enum';
import { Repository } from 'typeorm';
import { WashLocation } from '../locations/entities/wash-location.entity';
import { Problem } from '../problems/entities/problem.entity';
import { Reward } from '../rewards/entities/reward.entity';
import { Service } from '../services/entities/service.entity';
import { SubscriptionService } from '../subscriptions/entities/subscription-service.entity';
import { Subscription } from '../subscriptions/entities/subscription.entity';
import { User } from '../users/entities/user.entity';
import { WashHall } from '../wash-halls/entities/wash-hall.entity';

@Injectable()
export class MockService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(WashLocation)
    private locationRepository: Repository<WashLocation>,
    @InjectRepository(WashHall)
    private washHallRepository: Repository<WashHall>,
    @InjectRepository(Problem)
    private problemRepository: Repository<Problem>,
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
    @InjectRepository(SubscriptionService)
    private subscriptionServiceRepository: Repository<SubscriptionService>,
    @InjectRepository(Reward)
    private rewardRepository: Repository<Reward>,
  ) {}

  async onModuleInit() {
    const count = await this.userRepository.count();
    if (count === 0) {
      console.log('🌱 Seeding database with mock data...');
      await this.seedDatabase();
      console.log('✅ Database seeded successfully!');
    }
  }

  async seedDatabase() {
    // Create services
    const services = await this.createServices();

    // Create subscriptions
    const subscriptions = await this.createSubscriptions();

    // Link subscriptions with services
    await this.linkSubscriptionsToServices(subscriptions, services);

    // Create locations
    const locations = await this.createLocations();

    // Create wash halls
    await this.createWashHalls(locations);

    // Create problems
    await this.createProblems();

    // Create rewards
    await this.createRewards();

    // Create users
    await this.createUsers(subscriptions[0].id);
  }

  async createServices() {
    const services = [
      {
        serviceName: 'Basic Wash',
        name: 'Basic Wash',
        description: 'A basic car wash service',
      },
      {
        serviceName: 'Premium Wash',
        name: 'Premium Wash',
        description: 'A premium car wash with additional features',
      },
      {
        serviceName: 'Deluxe Wash',
        name: 'Deluxe Wash',
        description: 'Our most comprehensive wash package',
      },
      {
        serviceName: 'Interior Cleaning',
        name: 'Interior Cleaning',
        description: 'Complete interior cleaning service',
      },
      {
        serviceName: 'Waxing',
        name: 'Waxing',
        description: 'Protective wax coating for your vehicle',
      },
      {
        serviceName: 'Polishing',
        name: 'Polishing',
        description: 'Professional polishing service',
      },
    ];

    return await Promise.all(
      services.map((service) => this.serviceRepository.save(service)),
    );
  }

  async createSubscriptions() {
    const subscriptions = [
      {
        tierName: 'Basic',
        description: 'Basic subscription with limited washes',
        price: 19.99,
      },
      {
        tierName: 'Standard',
        description: 'Standard subscription with more features',
        price: 29.99,
      },
      {
        tierName: 'Premium',
        description: 'Premium subscription with all features',
        price: 49.99,
      },
    ];

    return await Promise.all(
      subscriptions.map((sub) => this.subscriptionRepository.save(sub)),
    );
  }

  async linkSubscriptionsToServices(subscriptions, services) {
    const subscriptionServices = [
      // Basic subscription gets basic wash only
      { subscriptionId: subscriptions[0].id, serviceId: services[0].id },

      // Standard subscription gets basic and premium wash
      { subscriptionId: subscriptions[1].id, serviceId: services[0].id },
      { subscriptionId: subscriptions[1].id, serviceId: services[1].id },

      // Premium subscription gets all services
      { subscriptionId: subscriptions[2].id, serviceId: services[0].id },
      { subscriptionId: subscriptions[2].id, serviceId: services[1].id },
      { subscriptionId: subscriptions[2].id, serviceId: services[2].id },
      { subscriptionId: subscriptions[2].id, serviceId: services[3].id },
      { subscriptionId: subscriptions[2].id, serviceId: services[4].id },
      { subscriptionId: subscriptions[2].id, serviceId: services[5].id },
    ];

    return await Promise.all(
      subscriptionServices.map((subService) =>
        this.subscriptionServiceRepository.save(subService),
      ),
    );
  }

  async createLocations() {
    const locations = [
      {
        name: 'Downtown Car Wash',
        address: '123 Main St',
        city: 'Metropolis',
        zipcode: '10001',
      },
      {
        name: 'Westside Auto Spa',
        address: '456 Ocean Ave',
        city: 'Metropolis',
        zipcode: '10002',
      },
      {
        name: 'Eastside Clean Cars',
        address: '789 River Rd',
        city: 'Gotham',
        zipcode: '20001',
      },
    ];

    return await Promise.all(
      locations.map((location) => this.locationRepository.save(location)),
    );
  }

  async createWashHalls(locations) {
    const washHalls = [
      // Downtown Car Wash halls
      {
        hallName: 'Hall A',
        maintenance: false,
        occupied: false,
        locationId: locations[0].id,
      },
      {
        hallName: 'Hall B',
        maintenance: false,
        occupied: false,
        locationId: locations[0].id,
      },
      {
        hallName: 'Hall C',
        maintenance: true,
        occupied: false,
        locationId: locations[0].id,
      },

      // Westside Auto Spa halls
      {
        hallName: 'Hall A',
        maintenance: false,
        occupied: true,
        locationId: locations[1].id,
      },
      {
        hallName: 'Hall B',
        maintenance: false,
        occupied: false,
        locationId: locations[1].id,
      },

      // Eastside Clean Cars halls
      {
        hallName: 'Hall A',
        maintenance: false,
        occupied: false,
        locationId: locations[2].id,
      },
      {
        hallName: 'Hall B',
        maintenance: false,
        occupied: false,
        locationId: locations[2].id,
      },
      {
        hallName: 'Hall C',
        maintenance: false,
        occupied: false,
        locationId: locations[2].id,
      },
      {
        hallName: 'Hall D',
        maintenance: true,
        occupied: false,
        locationId: locations[2].id,
      },
    ];

    return await Promise.all(
      washHalls.map((hall) => this.washHallRepository.save(hall)),
    );
  }

  async createProblems() {
    const problems = [
      { problemType: 'Machine Malfunction' },
      { problemType: 'Water Pressure Issue' },
      { problemType: 'Soap Dispenser Problem' },
      { problemType: 'Payment System Error' },
      { problemType: 'Cleanliness Issue' },
      { problemType: 'Staff Service Issue' },
      { problemType: 'Other' },
    ];

    return await Promise.all(
      problems.map((problem) => this.problemRepository.save(problem)),
    );
  }

  async createRewards() {
    const rewards = [
      {
        rewardName: 'Free Basic Wash',
        description: 'Get a free basic wash on your next visit',
        pointRequired: 100,
        redeemable: true,
      },
      {
        rewardName: 'Free Premium Wash',
        description: 'Get a free premium wash on your next visit',
        pointRequired: 200,
        redeemable: true,
      },
      {
        rewardName: 'Free Interior Detail',
        description: 'Get a free interior detailing service',
        pointRequired: 300,
        redeemable: true,
      },
      {
        rewardName: '50% Off Any Wash',
        description: 'Get 50% off any wash service',
        pointRequired: 150,
        redeemable: true,
      },
      {
        rewardName: 'VIP Month Pass',
        description: 'Unlimited washes for a month',
        pointRequired: 1000,
        redeemable: true,
      },
    ];

    return await Promise.all(
      rewards.map((reward) => this.rewardRepository.save(reward)),
    );
  }

  async createUsers(defaultSubscriptionId) {
    // Hash passwords
    const salt = await bcrypt.genSalt();
    const hashedPassword1 = await bcrypt.hash('password123', salt);
    const hashedPassword2 = await bcrypt.hash('securepass', salt);
    const hashedPassword3 = await bcrypt.hash('testpass', salt);

    const users = [
      {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john@example.com',
        password: hashedPassword1,
        licensePlate: 'ABC123',
        points: 150,
        subscriptionId: defaultSubscriptionId,
        membership: Membership.GOLD,
      },
      {
        firstname: 'Jane',
        lastname: 'Smith',
        email: 'jane@example.com',
        password: hashedPassword2,
        licensePlate: 'XYZ789',
        points: 300,
        subscriptionId: defaultSubscriptionId,
        membership: Membership.PREMIUM,
      },
      {
        firstname: 'Bob',
        lastname: 'Johnson',
        email: 'bob@example.com',
        password: hashedPassword3,
        licensePlate: 'DEF456',
        points: 50,
        subscriptionId: defaultSubscriptionId,
        membership: Membership.BRILLANT,
      },
    ];

    return await Promise.all(
      users.map((user) => this.userRepository.save(user)),
    );
  }
}
