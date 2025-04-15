import {CanActivate, ExecutionContext, ForbiddenException, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean {
        const  requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
        if(!requiredRoles){
            return true;
        }

        const { user } = context.switchToHttp().getRequest();

        const hasRole = requiredRoles.some((role) => user?.roles?.include(role));

        if(!hasRole) throw new ForbiddenException("Você  não tem permissão de acesso!");

        return false;
    }

}
