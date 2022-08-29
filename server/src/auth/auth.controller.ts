import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @ApiOperation({summary: 'Регистрация нового пользователя'})
    @UsePipes(ValidationPipe)
    @Post('/register')
    register(@Body() dto: CreateUserDto) {
        return this.authService.register(dto)
    }

    @ApiOperation({summary: 'Авторизация'})
    @Post('/login')
    login(@Body() dto: CreateUserDto) {
        return this.authService.login(dto)
    }

}
