import { Membership } from 'src/common/enums/membership.enum';

export class JwtPayloadDto {
  email: string;
  id: string;
  licensePlate: string;
  membership: Membership;
}
