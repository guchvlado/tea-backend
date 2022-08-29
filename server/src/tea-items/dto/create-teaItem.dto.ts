import { ApiProperty } from "@nestjs/swagger";

export class CreateTeaDto {

    @ApiProperty({example: 'Те гуань инь', description: 'Название чая'})
    readonly title: string;

    @ApiProperty({example: '1000', description: 'Цена'})
    readonly price: number;

    @ApiProperty({example: '7', description: 'Рейтинг'})
    readonly rating: number;

    @ApiProperty({example: '1', description: 'Id категории'})
    readonly categoryId: number;
}