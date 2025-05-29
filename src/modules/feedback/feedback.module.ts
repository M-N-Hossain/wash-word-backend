import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackReport } from './entities/feedback-report.entity';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([FeedbackReport]), UsersModule],
  providers: [FeedbackService],
  controllers: [FeedbackController],
  exports: [TypeOrmModule],
})
export class FeedbackModule {}
