import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateSubscriptionDto {
  @ApiProperty({
    description: 'The UUID of the new subscription plan',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID()
  subscriptionId: string;
}
