import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
      Reward,
      UserReward,
      FeedbackReport,
      Wash,
    ]),
  ],
  providers: [MockService],
})
export class MockModule {}
