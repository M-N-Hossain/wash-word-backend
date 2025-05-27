import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { FeedbackReport } from '../feedback/entities/feedback-report.entity';
import { WashLocation } from '../locations/entities/wash-location.entity';
import { Problem } from '../problems/entities/problem.entity';
import { Reward } from '../rewards/entities/reward.entity';
import { UserReward } from '../rewards/entities/user-reward.entity';
import { Service } from '../services/entities/service.entity';
import { Subscription } from '../subscriptions/entities/subscription.entity';
import { User } from '../users/entities/user.entity';
import { WashHall } from '../wash-halls/entities/wash-hall.entity';
import { Wash } from '../washes/entities/wash.entity';

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

    @InjectRepository(Reward)
    private rewardRepository: Repository<Reward>,
    @InjectRepository(UserReward)
    private userRewardRepository: Repository<UserReward>,
    @InjectRepository(FeedbackReport)
    private feedbackReportRepository: Repository<FeedbackReport>,
    @InjectRepository(Wash)
    private washRepository: Repository<Wash>,
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

    // Create subscriptions
    const subscriptions = await this.createSubscriptions();

    // Create locations
    const locations = await this.createLocations();

    // Create wash halls
    const washHalls = await this.createWashHalls(locations);

    // Create problems
    const problems = await this.createProblems();

    // Create rewards
    const rewards = await this.createRewards();

    // Create users
    const users = await this.createUsers(subscriptions[0].id);

    // Create user rewards
    await this.createUserRewards(users, rewards);

    // Create washes
    const washes = await this.createWashes(users, washHalls, rewards);

    // Create feedback reports
    await this.createFeedbackReports(users, problems, washes);
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
        tierName: 'Gold',
        description: 'Gold subscription with limited washes',
        price: 19.99,
      },
      {
        tierName: 'Premium',
        description: 'Premium subscription with more features',
        price: 29.99,
      },
      {
        tierName: 'Brilliant',
        description: 'Brilliant subscription with all features',
        price: 49.99,
      },
    ];

    return await Promise.all(
      subscriptions.map((sub) => this.subscriptionRepository.save(sub)),
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
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: hashedPassword1,
        licensePlate: 'ABC123',
        points: 150,
        subscriptionId: defaultSubscriptionId,
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        password: hashedPassword2,
        licensePlate: 'XYZ789',
        points: 300,
        subscriptionId: defaultSubscriptionId,
      },
      {
        firstName: 'Bob',
        lastName: 'Johnson',
        email: 'bob@example.com',
        password: hashedPassword3,
        licensePlate: 'DEF456',
        points: 50,
        subscriptionId: defaultSubscriptionId,
      },
    ];

    return await Promise.all(
      users.map((user) => this.userRepository.save(user)),
    );
  }

  async createUserRewards(users, rewards) {
    const userRewards = [
      {
        userId: users[0].id,
        rewardId: rewards[0].id,
        dateRedeem: new Date(),
      },
      {
        userId: users[1].id,
        rewardId: rewards[1].id,
        dateRedeem: new Date(),
      },
    ];

    return await Promise.all(
      userRewards.map((userReward) =>
        this.userRewardRepository.save(userReward),
      ),
    );
  }

  async createWashes(users, washHalls, rewards) {
    const washes = [
      {
        washDatetime: new Date(),
        washHallId: washHalls[0].id,
        pointsGained: 50,
        userId: users[0].id,
        reward: false,
        WashLocation: 'Egevej 4, 6200 Aabenraa',
      },
      {
        washDatetime: new Date(Date.now() - 86400000), // Yesterday
        washHallId: washHalls[1].id,
        pointsGained: 75,
        userId: users[1].id,
        reward: true,
        rewardId: rewards[0].id,
        WashLocation: 'Egevej 4, 6200 Aabenraa',
      },
      {
        washDatetime: new Date(Date.now() - 172800000), // 2 days ago
        washHallId: washHalls[2].id,
        pointsGained: 100,
        userId: users[2].id,
        reward: false,
        WashLocation: 'Egevej 4, 6200 Aabenraa',
      },
    ];

    return await Promise.all(
      washes.map((wash) => this.washRepository.save(wash)),
    );
  }

  async createFeedbackReports(users, problems, washes) {
    const feedbackReports = [
      {
        title: 'Great Service',
        description: 'The staff was very friendly and helpful',
        rating: 'excellent',
        problemId: null,
        userId: users[0].id,
      },
      {
        title: 'Water Pressure Issues',
        description: 'The water pressure was too low during my wash',
        rating: 'average',
        problemId: problems[1].id,
        userId: users[1].id,
      },
      {
        title: 'Soap Issues',
        description: 'Not enough soap was dispensed during the wash cycle',
        rating: 'poor',
        problemId: problems[2].id,
        userId: users[2].id,
      },
    ];

    // Create feedback reports
    const reports = await Promise.all(
      feedbackReports.map((report) =>
        this.feedbackReportRepository.save(report),
      ),
    );

    // Link first feedback to first wash
    if (washes && washes.length > 0 && reports && reports.length > 0) {
      washes[0].feedbackId = reports[0].id;
      await this.washRepository.save(washes[0]);
    }

    return reports;
  }
}
