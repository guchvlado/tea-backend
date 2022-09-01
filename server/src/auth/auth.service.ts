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
        const token = await this.generateToken(user)
        return {
            user: {
                email: user.email,
                id: user.id,
                role: user.role
            },
            token
        }
    }


    async login(dto: CreateUserDto) {
        const user = await this.validateUser(dto)
        const token = await this.generateToken(user)
        return {
            user: {
                email: user.email,
                id: user.id,
                role: user.role
            },
            token
        }
    }

    async validateToken(token: string) {
        try {
            const payload = await this.jwtService.verify(token)
            return payload
        } catch(e) {
            throw new UnauthorizedException()
        }
    }

    async generateToken(user: User) {
        const payload = {email: user.email, id: user.id, role: user.role}
        return this.jwtService.sign(payload)
    }

    async validateUser(dto: CreateUserDto) {
        const user = await this.usersService.getUserByEmail(dto.email)
        if (!user) {
            throw new UnauthorizedException({message: 'Неверная почта'})
        }
        const passwordEquals = await bcrypt.compare(dto.password, user.password)
        if (!passwordEquals) {
            throw new UnauthorizedException({message: 'Неверный пароль'})
        }
        return user
    }

}
