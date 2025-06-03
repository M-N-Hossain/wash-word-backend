import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackReport } from '../feedback/entities/feedback-report.entity';
import { Subscription } from '../subscriptions/entities/subscription.entity';
import { User } from '../users/entities/user.entity';
import { Wash } from '../washes/entities/wash.entity';
import { MockService } from './mock.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Subscription, FeedbackReport, Wash]),
  ],
  providers: [MockService],
})
export class MockModule {}
