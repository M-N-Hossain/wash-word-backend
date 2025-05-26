import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from './entities/feedback.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
    private readonly usersService: UsersService,
  ) {}

  async create(createFeedbackDto: CreateFeedbackDto) {
    const user = await this.usersService.findOne(createFeedbackDto.user_id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const feedback = this.feedbackRepository.create({
        createFeedbackDto,
        user: user,
    });
    return this.feedbackRepository.save(feedback);
  }
}
