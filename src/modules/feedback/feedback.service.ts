import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { FeedbackReport } from './entities/feedback-report.entity';
import { CreateFeedbackReportDto } from './dto/create-feedbackReport.dto';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(FeedbackReport)
    private feedbackRepository: Repository<FeedbackReport>,
    private readonly usersService: UsersService,
  ) {}

  async create(createFeedbackReportDto: CreateFeedbackReportDto) {
    const user = await this.usersService.findOne(
      createFeedbackReportDto.userId,
    );
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const feedbackReport = this.feedbackRepository.create({
      ...createFeedbackReportDto,
      user: user,
    });
    return this.feedbackRepository.save(feedbackReport);
  }

  async findByUserId(userId: number) {
    return this.feedbackRepository.find({
      where: { user: { id: String(userId) } },
    });
  }
}
