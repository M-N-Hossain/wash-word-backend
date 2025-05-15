import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Membership } from 'src/common/enums/membership.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  licensePlate: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  membership: Membership;

  createdAt: Date;
  updatedAt: Date;
}
