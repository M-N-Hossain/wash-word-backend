import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWashDto {
  @IsString()
  @IsNotEmpty()
  wash_location: string;

  @IsNotEmpty()
  user_id: string;
}
