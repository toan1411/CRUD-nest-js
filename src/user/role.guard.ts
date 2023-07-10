import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "./entities/role.enum";
import { ROLES_KEY } from "./roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor (private reflector: Reflector){}

    canActivate(context: ExecutionContext ): boolean{
        const requireRole = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY,[
            context.getHandler(),
            context.getClass()
        ])
        if(!requireRole){
            return true
        }
       const { user }= context.switchToHttp().getRequest();

        console.log(context.switchToHttp().getRequest().user)
       
        return requireRole.some((role)=>user.roles.include(role)); 
    }
}