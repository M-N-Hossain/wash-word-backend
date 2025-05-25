import { Controller } from '@nestjs/common';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createWashDto: CreateWashDto) {
    return this.washService.create(createWashDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findByUserId(@Param('id') id: number) {
    return this.washService.findByUserId(id);
  }
}
