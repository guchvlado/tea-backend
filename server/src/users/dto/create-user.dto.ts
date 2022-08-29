import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
    
    @IsString({message: "должно быть строкой"})
    @IsEmail({}, {message: 'не корректна указана почта'})
    readonly email: string;

    @IsString({message: 'должно быть строкой'})
    @Length(4, 16, {message: 'пароль должен быть не менее 4 символов, и не более 16'})
    readonly password: string;
}