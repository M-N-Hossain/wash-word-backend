import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Membership } from 'src/common/enums/membership.enum';
import { MEMBERSHIP_KEY } from '../decorators/membership-decorator';

@Injectable()
export class MembershipGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredMemberships = this.reflector.getAllAndOverride<Membership[]>(
      MEMBERSHIP_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredMemberships) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    // Check if the user has any of the required memberships
    const hasRequiredMembership = requiredMemberships.some(
      (membership) => user.membership === membership,
    );

    if (!hasRequiredMembership) {
      throw new ForbiddenException(
        `Access denied. Required membership: ${requiredMemberships.join(', ')}`,
      );
    }

    return true;
  }
}
