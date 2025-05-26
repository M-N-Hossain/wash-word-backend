import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WashLocation } from '../locations/entities/wash-location.entity';
import { Problem } from '../problems/entities/problem.entity';
import { Reward } from '../rewards/entities/reward.entity';
import { Service } from '../services/entities/service.entity';
import { SubscriptionService } from '../subscriptions/entities/subscription-service.entity';
import { Subscription } from '../subscriptions/entities/subscription.entity';
import { User } from '../users/entities/user.entity';
import { WashHall } from '../wash-halls/entities/wash-hall.entity';
import { MockService } from './mock.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      WashLocation,
      WashHall,
      Problem,
      Subscription,
      Service,
      SubscriptionService,
      Reward,
    ]),
  ],
  providers: [MockService],
})
export class MockModule {}
