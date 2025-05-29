import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateFeedbackReportDto } from './dto/create-feedbackReport.dto';

@Controller('api/feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createFeedbackReportDto: CreateFeedbackReportDto) {
    return this.feedbackService.create(createFeedbackReportDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findByUserId(@Param('id') id: number) {
    return this.feedbackService.findByUserId(id);
  }
}
