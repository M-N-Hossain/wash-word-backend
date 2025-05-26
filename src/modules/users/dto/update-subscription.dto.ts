import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateSubscriptionDto {
  @IsNotEmpty()
  @IsUUID()
  subscriptionId: string;
}
