
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { Role } from '../../user/entities/role.enum';
import { User } from '../../user/entities/user.entity';

const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();
      const user: User = request.user;
      return user?.roles.includes(role);
    }
  }
  return mixin(RoleGuardMixin);
}

export default RoleGuard;