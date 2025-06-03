import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { FeedbackReport } from '../feedback/entities/feedback-report.entity';
import { Subscription } from '../subscriptions/entities/subscription.entity';
import { User } from '../users/entities/user.entity';
import { Wash } from '../washes/entities/wash.entity';

@Injectable()
export class MockService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
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
    // Create subscriptions
    const subscriptions = await this.createSubscriptions();

    // Create users
    const users = await this.createUsers(subscriptions[0].id);

    // Create washes
    const washes = await this.createWashes(users);

    // Create feedback reports
    await this.createFeedbackReports(users, washes);
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

  async createWashes(users) {
    const washes = [
      {
        washDatetime: new Date(),
        pointsGained: 50,
        userId: users[0].id,
        reward: false,
        washLocation: 'Egevej 4, 6200 Aabenraa',
      },
      {
        washDatetime: new Date(Date.now() - 86400000), // Yesterday
        pointsGained: 75,
        userId: users[1].id,
        reward: false,
        washLocation: 'Egevej 4, 6200 Aabenraa',
      },
      {
        washDatetime: new Date(Date.now() - 172800000), // 2 days ago
        pointsGained: 100,
        userId: users[2].id,
        reward: false,
        washLocation: 'Egevej 4, 6200 Aabenraa',
      },
    ];

    return await Promise.all(
      washes.map((wash) => this.washRepository.save(wash)),
    );
  }

  async createFeedbackReports(users, washes) {
    const feedbackReports = [
      {
        title: 'Great Service',
        description: 'The staff was very friendly and helpful',
        rating: 5,
        userId: users[0].id,
        washId: washes[0].id,
      },
      {
        title: 'Water Pressure Issues',
        description: 'The water pressure was too low during my wash',
        rating: 3,
        userId: users[1].id,
        washId: washes[1].id,
      },
      {
        title: 'Soap Issues',
        description: 'Not enough soap was dispensed during the wash cycle',
        rating: 1,
        userId: users[2].id,
        washId: washes[2].id,
      },
    ];

    // Create feedback reports
    const reports = await Promise.all(
      feedbackReports.map((report) =>
        this.feedbackReportRepository.save(report),
      ),
    );

    return reports;
  }
}
