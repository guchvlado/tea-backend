import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {

    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            // const auth = req.headers.authorization
            // const [authType, token] = auth.split(' ')
            
            // if (!token || authType !== 'Bearer') {
            //     throw new UnauthorizedException({message: "Вы не авторизованы"})
            // }
            const accessToken = req.cookies?.accessToken
            if (!accessToken) {
                throw new UnauthorizedException({message: "Вы не авторизованы"})
            }
            const user = this.jwtService.verify(accessToken)
            req.user = user
            return true
        } catch(e) {
            throw new UnauthorizedException({message: "Вы не авторизованы"})
        }
    }
}