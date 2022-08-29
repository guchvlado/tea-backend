import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
    
    @ApiProperty({example: 'user@gmail.com', description: 'Почта'})
    @IsString({message: "должно быть строкой"})
    @IsEmail({}, {message: 'не корректна указана почта'})
    readonly email: string;

    @ApiProperty({example: '123123', description: 'Пароль'})
    @IsString({message: 'должно быть строкой'})
    @Length(4, 16, {message: 'пароль должен быть не менее 4 символов, и не более 16'})
    readonly password: string;
}