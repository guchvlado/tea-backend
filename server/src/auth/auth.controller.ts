import { Body, Controller, Get, Param, Post, Req, Res, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Auth } from './auth.interfaces';
import { AuthService } from './auth.service';
import { Cookies } from './cookies.decorator';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @ApiOperation({summary: 'Регистрация нового пользователя'})
    @UsePipes(ValidationPipe)
    @Post('/register')
    async register(@Body() dto: CreateUserDto, @Res({passthrough: true}) res: Response): Promise<Auth> {
        const registerResult = await this.authService.register(dto)
        res.cookie('accessToken', registerResult.token, {httpOnly: true, maxAge: 3600 * 24 * 1000})
        return registerResult
    }

    @ApiOperation({summary: 'Авторизация'})
    @Post('/login')
    async login(@Body() dto: CreateUserDto, @Res({passthrough: true}) res: Response): Promise<Auth> {
        const loginResult = await this.authService.login(dto)
        res.cookie('accessToken', loginResult.token, {httpOnly: true, maxAge: 3600 * 24 * 1000})
        return loginResult
    }

    @Get('/logout')
    logout(@Res({passthrough: true}) res: Response) {
        res.clearCookie('accessToken')
        return {message: 'cookie cleared'}
    }

    @Get('/validate/:token')
    validateToken(@Param('token') token: string) {
        return this.authService.validateToken(token)
    }

}
