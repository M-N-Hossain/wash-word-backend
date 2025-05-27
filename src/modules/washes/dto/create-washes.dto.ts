import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateWashesDto {
  @IsNumber()
  points_gained: number;

  @IsString()
  @IsOptional()
  fk_feedback_id?: string;

  @IsString()
  fk_user_id: string;

  @IsString()
  @IsOptional()
  wash_location: string;

  @IsBoolean()
  reward: boolean;

  @IsString()
  fk_reward_id?: string;

  @IsDate()
  @IsOptional()
  wash_datetime?: string;
}
