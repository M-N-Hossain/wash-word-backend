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
  fk_user_id: string;

  @IsString()
  @IsOptional()
  wash_location: string;

  @IsBoolean()
  reward: boolean;

  @IsString()
  @IsOptional()
  fk_reward_id?: string;

  @IsDate()
  @IsOptional()
  wash_datetime?: string;
}
