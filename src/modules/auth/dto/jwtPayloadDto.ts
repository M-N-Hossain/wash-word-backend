import { Membership } from 'src/common/enums/membership.enum';

export class JwtPayloadDto {
  email: string;
  id: number;
  licensePlate: string;
  membership: Membership;
}
