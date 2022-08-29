import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @UsePipes(ValidationPipe)
    @Post('/register')
    register(@Body() dto: CreateUserDto) {
        return this.authService.register(dto)
    }

    @Post('/login')
    login(@Body() dto: CreateUserDto) {
        return this.authService.login(dto)
    }

}
