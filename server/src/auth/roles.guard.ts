import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private jwtService: JwtService,
                private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ])
            if (!requiredRoles) {
                return true
            }
            const accessToken = req.cookies?.accessToken
            // const auth = req.headers.authorization
            // const [authType, token] = auth.split(' ')
            
            // if (!token || authType !== 'Bearer') {
            //     throw new UnauthorizedException({message: "Вы не авторизованы"})
            // }
            if (!accessToken) {
                throw new UnauthorizedException({message: "Вы не авторизованы"})
            }
            const user = this.jwtService.verify(accessToken)
            req.user = user
            return user.role.some(role => requiredRoles.includes(role.name))
        } catch(e) {
            throw new HttpException("Нет доступа", HttpStatus.FORBIDDEN)
        }
    }
}