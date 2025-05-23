import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateWashDto {
  @IsString()
  @IsNotEmpty()
  wash_location: string;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
