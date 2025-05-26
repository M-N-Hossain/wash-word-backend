import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFeedbackDto {
  @IsString()
  @IsNotEmpty()
  comment: number;

  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @IsNumber()
  @IsNotEmpty()
  wash_id: number;

  @IsNumber()
  @IsNotEmpty()
  reason_id: number;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
