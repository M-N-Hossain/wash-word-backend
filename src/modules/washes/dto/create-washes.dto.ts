import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsBoolean,
    IsDate,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateWashesDto {
  @ApiProperty({
    description: 'The number of points gained from this wash',
    example: 50,
  })
  @IsNumber()
  points_gained: number;

  @ApiProperty({
    description: 'The ID of the user who got the wash',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  fk_user_id: string;

  @ApiPropertyOptional({
    description: 'The location where the wash took place',
    example: 'Main Street Wash Hall',
  })
  @IsString()
  @IsOptional()
  wash_location: string;

  @ApiProperty({
    description: 'Whether a reward was used for this wash',
    example: false,
  })
  @IsBoolean()
  reward: boolean;

  @ApiPropertyOptional({
    description: 'The name of the reward used for this wash, if any',
    example: 'Free Basic Wash',
  })
  @IsString()
  @IsOptional()
  reward_name?: string;

  @ApiPropertyOptional({
    description: 'The date and time when the wash occurred',
    example: '2023-01-01T12:00:00Z',
  })
  @IsDate()
  @IsOptional()
  wash_datetime?: string;
}
