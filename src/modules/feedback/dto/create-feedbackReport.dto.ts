import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateFeedbackReportDto {
  @ApiProperty({
    description: 'The title of the feedback report',
    example: 'Great Service',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The detailed description of the feedback',
    example: 'The staff was very friendly and helpful',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The rating given by the user (1-5)',
    example: '5',
    enum: ['1', '2', '3', '4', '5'],
  })
  @IsString()
  rating: number;

  @ApiPropertyOptional({
    description: 'The ID of the problem category (if any)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsOptional()
  problemId?: string;

  @ApiProperty({
    description: 'The ID of the user submitting the feedback',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'The ID of the wash associated with this feedback',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  washId: string;
}
