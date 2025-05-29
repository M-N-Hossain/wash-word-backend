import { IsOptional, IsString } from 'class-validator';

export class CreateFeedbackReportDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  rating: number;

  @IsString()
  @IsOptional()
  problemId?: string;

  @IsString()
  userId: string;

  @IsString()
  washId: string;
}
