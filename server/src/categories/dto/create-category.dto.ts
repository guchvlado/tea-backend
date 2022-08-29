import { ApiProperty } from "@nestjs/swagger";

export class CreateCategory {
    @ApiProperty({example: 'Зеленый чай', description: 'Категория чая'})
    readonly name: string;
}