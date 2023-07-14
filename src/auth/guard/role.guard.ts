
import { CanActivate, ExecutionContext, Type } from '@nestjs/common';
import { Role } from '../../user/entities/role.enum';
import { User } from '../../user/entities/user.entity';

const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();
      const user: User = request.user;                              
      return user?.roles.includes(role);
    }
  }
  return RoleGuard;
}
export default RoleGuard;