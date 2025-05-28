import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackReport } from './entities/feedback-report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FeedbackReport])],
  exports: [TypeOrmModule],
})
export class FeedbackModule {}
