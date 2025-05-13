import { SetMetadata } from '@nestjs/common';
import { Membership } from '../../../common/enums/membership.enum';

export const MEMBERSHIP_KEY = 'membership';
export const RequireMemberships = (...memberships: Membership[]) =>
  SetMetadata(MEMBERSHIP_KEY, memberships);
