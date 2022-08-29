import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService,
                private usersService: UsersService) {}

    async register(dto: CreateUserDto) {
        const candidate = await this.usersService.getUserByEmail(dto.email)
        if (candidate) {
            throw new HttpException("Данная почта уже занята", HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(dto.password, 5)
        const user = await this.usersService.createUser({...dto, password: hashPassword})
        return await this.generateToken(user)
    }


    async login(dto: CreateUserDto) {
        const user = await this.validateUser(dto)
        return await this.generateToken(user)
    }

    async generateToken(user: User) {
        const payload = {email: user.email, id: user.id, roles: user.role}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    async validateUser(dto: CreateUserDto) {
        const user = await this.usersService.getUserByEmail(dto.email)
        const passwordEquals = await bcrypt.compare(dto.password, user.password)
        if (user && passwordEquals) {
            return user
        }
        throw new UnauthorizedException({message: 'Неверная почта или пароль'})
    }

}
