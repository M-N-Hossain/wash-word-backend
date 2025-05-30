import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateFeedbackReportDto } from './dto/create-feedbackReport.dto';
import { FeedbackReport } from './entities/feedback-report.entity';
import { FeedbackService } from './feedback.service';

@ApiTags('feedback')
@Controller('api/feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @ApiOperation({ summary: 'Create a new feedback report' })
  @ApiResponse({
    status: 201,
    description: 'Feedback report created successfully',
    type: FeedbackReport,
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createFeedbackReportDto: CreateFeedbackReportDto) {
    return this.feedbackService.create(createFeedbackReportDto);
  }

  @ApiOperation({ summary: 'Get feedback reports by user ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns feedback reports for the specified user',
    type: [FeedbackReport],
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findByUserId(@Param('id') id: number) {
    return this.feedbackService.findByUserId(id);
  }
}
